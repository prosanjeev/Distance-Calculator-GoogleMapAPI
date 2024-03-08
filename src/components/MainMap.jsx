import { Box, Button, Flex } from "@chakra-ui/react";
import { DistanceDuration } from "./DistanceDuration";
import { InputFields } from "./InputFields";
import { MapDisplay } from "./MapDisplay";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

const MainMap = () => {
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
  
    const onLoad = React.useCallback(function callback(map) {
      setMap(map);
    }, []);
  
    const onUnmount = React.useCallback(function callback(map) {
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
              const { latitude, longitude } = position.coords;
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDyWpEcvKSIJ6VBi6AYbhYEWOBdFEt0X1M`)
                .then(response => response.json())
                .then(data => {
                  if (data.results && data.results.length > 0) {
                    const placeName = data.results[0].formatted_address;
                    setOrigin(placeName);
                  }
                  setLoading(false);
                })
                .catch(error => {
                  setError(error.message);
                  setLoading(false);
                });
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
            <InputFields
              origin={origin}
              onOriginChange={onOriginChange}
              destination={destination}
              onDestinationChange={onDestinationChange}
              travelMode={travelMode}
              onTravelModeChange={onTravelModeChange}
              getLocation={getLocation}
            />
            <Button colorScheme="blue" onClick={calculateDistance}>
              Calculate Distance
            </Button>
            <DistanceDuration directions={directions} />
          </Box>
    
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
    
          <MapDisplay
            origin={origin}
            destination={destination}
            directions={directions}
            map={map}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </Flex>
      ) : (
        <></>
      );
    };
  
  export default React.memo(MainMap);