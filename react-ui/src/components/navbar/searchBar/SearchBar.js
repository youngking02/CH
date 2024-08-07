import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export function SearchBar(props) {
  const { background, borderRadius, ...rest } = props;

  // Chakra Color Mode
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");

  return (
    <Box
      w={{ base: "100%", md: "200px" }}
      bg={background ? background : inputBg}
      color={inputText}
      fontWeight="500"
      fontSize="sm"
      borderRadius={borderRadius ? borderRadius : "30px"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="2"
      {...rest}
    >
      CH-Provider
    </Box>
  );
}
