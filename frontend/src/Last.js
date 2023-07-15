import React from 'react';
import { Box, Button, Grid, GridItem, Heading, Text, ChakraProvider } from '@chakra-ui/react';
import NavBar from "./components/NavBar";
import image from "./8310471.jpg";

const Last = () => {
  return (
    <ChakraProvider>
      <NavBar />
      <Grid templateColumns="repeat(4, 1fr)" gap={6} p={6}>
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            color="white"
            background="blue.500"
            height="500px"
            bgGradient="linear(to-r, #99EDC3, #60A5FA)"
            _hover={{ bgGradient: "linear(to-r, #60A5FA, #99EDC3)" }}
            transition="background-color 0.3s ease"
            position="relative"
          >
            <img
              src={image}
              alt="Image"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Heading size="md" mt={5}>Title</Heading>
            <Text mt={2} color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at tincidunt.
            </Text>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              left="4"
            >
              Buy Now
            </Button>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              right="4"
            >
              Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            color="white"
            background="blue.500"
            height="500px"
            bgGradient="linear(to-r, #99EDC3, #60A5FA)"
            _hover={{ bgGradient: "linear(to-r, #60A5FA, #99EDC3)" }}
            transition="background-color 0.3s ease"
            position="relative"
          >
            <img
              src={image}
              alt="Image"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Heading size="md" mt={5}>Title</Heading>
            <Text mt={2} color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at tincidunt.
            </Text>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              left="4"
            >
              Buy Now
            </Button>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              right="4"
            >
              Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            color="white"
            background="blue.500"
            height="500px"
            bgGradient="linear(to-r, #99EDC3, #60A5FA)"
            _hover={{ bgGradient: "linear(to-r, #60A5FA, #99EDC3)" }}
            transition="background-color 0.3s ease"
            position="relative"
          >
            <img
              src={image}
              alt="Image"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Heading size="md" mt={5}>Title</Heading>
            <Text mt={2} color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at tincidunt.
            </Text>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              left="4"
            >
              Buy Now
            </Button>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              right="4"
            >
              Price
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            color="white"
            background="blue.500"
            height="500px"
            bgGradient="linear(to-r, #99EDC3, #60A5FA)"
            _hover={{ bgGradient: "linear(to-r, #60A5FA, #99EDC3)" }}
            transition="background-color 0.3s ease"
            position="relative"
          >
            <img
              src={image}
              alt="Image"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Heading size="md" mt={5}>Title</Heading>
            <Text mt={2} color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper auctor velit at tincidunt.
            </Text>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              left="4"
            >
              Buy Now
            </Button>
            <Button
              colorScheme="teal"
              mt="auto"
              position="absolute"
              bottom="4"
              right="4"
            >
              Price
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default Last;
