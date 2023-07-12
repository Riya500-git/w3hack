import React from 'react';
import { Box, Button, Grid, GridItem, Heading, Text, ChakraProvider } from '@chakra-ui/react';
import NavBar from "./components/NavBar";

const Last = () => {
  return (
    <ChakraProvider>
      <NavBar />
      <Grid templateColumns="repeat(4, 1fr)" gap={6} p={6}>
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={4} color="black" background="#FFDB58" height="300px"  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
            <Heading size="md">Title</Heading>
            <Text mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at
              tincidunt.
            </Text>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Buy Now
            </Button>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={4} background="#FFDB58" height="300px"  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
            <Heading size="md">Title</Heading>
            <Text mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at
              tincidunt.
            </Text>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Buy Now
            </Button>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={4} background="#FFDB58" height="300px"  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
            <Heading size="md">Title</Heading>
            <Text mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at
              tincidunt.
            </Text>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Buy Now
            </Button>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={4} background="#FFDB58" height="300px"  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
            <Heading size="md">Title</Heading>
            <Text mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at
              tincidunt.
            </Text>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease">
              Buy Now
            </Button>
            <Button colorScheme="teal" mt={4}  boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #F59E0B, #FEC34B)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0C)" }}
              transition="background-color 0.3s ease">
              Price
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default Last;
