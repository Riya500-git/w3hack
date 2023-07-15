import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box
      bg="blue.500"
      padding="1rem"
      display="flex"
      justifyContent="flex-end"
    >
      <Button
        colorScheme="teal"
        borderRadius="14px"
        size="md"
        marginRight="0.5rem"
        color="white"
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
          colorScheme="teal"
          borderRadius="14px"
          size="md"
          marginRight="0.5rem"
          color="white"
          fontWeight="600"
          _hover={{ bg: "#99EDC3" }}
          _focus={{ boxShadow: "0 0 0 2px #007bff" }}
          _active={{ bg: "#3DED17" }}
        >
          Marketplace
        </Button>
      </Link>

      <Button
        colorScheme="teal"
        borderRadius="14px"
        size="md"
        marginRight="0.5rem"
        color="white"
        fontWeight="600"
        _hover={{ bg: "#99EDC3" }}
        _focus={{ boxShadow: "0 0 0 2px #007bff" }}
        _active={{ bg: "#3DED17" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default NavBar;
