import { Box, Flex, Icon, Input, Select } from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";

// InputFields component
export const InputFields = ({
    origin,
    onOriginChange,
    destination,
    onDestinationChange,
    travelMode,
    onTravelModeChange,
    getLocation,
  }) => {
    return (
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
      </Flex>
    );
  };