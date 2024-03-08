import { Box } from "@chakra-ui/react";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";

export const MapDisplay = ({ origin, destination, directions, map, onLoad, onUnmount }) => {
    return (
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
    );
  };