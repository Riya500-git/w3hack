import React from "react";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Last from "../Last";

const NavBar = () => {
  return (
    <ChakraProvider>
      <Box
        bg="#f2f2f2"
        padding="1rem"
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          variant="outline"
          colorScheme="teal"
          borderRadius="14px"
          size="md"
          marginRight="0.5rem"
          color="#3DED17"
          fontWeight="600"
          _hover={{ bg: "#99EDC3" }}
          _focus={{ boxShadow: "0 0 0 2px #007bff" }}
          _active={{ bg: "#3DED17" }}
        >
          Address
        </Button>

        <Link to="/Last">
        <Button
          as="a"
          href="/"
          variant="outline"
          colorScheme="teal"
          borderRadius="14px"
          size="md"
          marginRight="0.5rem"
          color="#3DED17"
          fontWeight="600"
          _hover={{ bg: "#99EDC3" }}
          _focus={{ boxShadow: "0 0 0 2px #007bff" }}
          _active={{ bg: "#3DED17" }}
        >
          Marketplace
        </Button>
        </Link>

        <Button
          variant="outline"
          colorScheme="teal"
          borderRadius="14px"
          size="md"
          marginRight="0.5rem"
          color="#3DED17"
          fontWeight="600"
          _hover={{ bg: "#99EDC3" }}
          _focus={{ boxShadow: "0 0 0 2px #007bff" }}
          _active={{ bg: "#3DED17" }}
        >
          Logout
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;
