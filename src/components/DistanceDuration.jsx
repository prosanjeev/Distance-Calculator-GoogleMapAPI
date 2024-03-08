import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";

// DistanceDuration component
export const DistanceDuration = ({ directions }) => {
    return (
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
            // map.setZoom(15);
          }}
        />
      </HStack>
    );
  };
  