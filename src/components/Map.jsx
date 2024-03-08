import React, { useCallback, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import {  FaLocationArrow } from "react-icons/fa";

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDyWpEcvKSIJ6VBi6AYbhYEWOBdFEt0X1M",
  });

  const [map, setMap] = useState(null);
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");

  console.log(map);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const onOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const onTravelModeChange = (event) => {
    setTravelMode(event.target.value);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigin({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = () => {
    if (destination.trim() === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          setDirections(response);
        } else {
          setError(
            "Unable to calculate directions. Please check your origin and destination."
          );
        }
      }
    );
  };

  return isLoaded ? (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box
        maxW={{ base: "100%", md: "100%" }}
        p={4}
        borderRadius="lg"
        bgColor="white"
        shadow="base"
        zIndex="1"
      >
        <Flex
          w={{ base: "90vw", md: "100%" }}
          gap={{ base: "0", md: "4" }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Enter origin"
                value={origin}
                onChange={onOriginChange}
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Icon
              onClick={getLocation}
              as={BiCurrentLocation}
              boxSize={10}
              cursor="pointer"
            />
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={onDestinationChange}
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Select value={travelMode} onChange={onTravelModeChange}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </Select>
          </Box>
          <Box flexGrow={1}>
            <Button colorScheme="blue" onClick={calculateDistance}>
              Calculate Distance
            </Button>
          </Box>
        </Flex>
        <HStack
          spacing={4}
          mt={4}
          justifyContent="space-between"
          w={{ base: "90vw", md: "100%" }}
          flexWrap="wrap"
        >
          <HStack fontSize="20px">
            <Text> Distance:</Text>
            {directions && (
              <Text> {directions.routes[0].legs[0].distance.text}</Text>
            )}
          </HStack>
          <HStack fontSize="20px">
            <Text> Duration:</Text>
            {directions && (
              <Text> {directions.routes[0].legs[0].duration.text}</Text>
            )}
          </HStack>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={origin ? origin : { lat: 0, lng: 0 }}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {directions && (
            <>
              <DirectionsRenderer directions={directions} />
              <Marker position={origin} />
              <Marker position={destination} />
            </>
          )}
        </GoogleMap>
      </Box>
    </Flex>
  ) : (
    <></>
  );
}

export default React.memo(Map);