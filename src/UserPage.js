import React, { useState } from "react";
import { Box, ChakraProvider, Text, HStack, VStack, Heading, Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

const UserPage = () => {
  const [showBiodata, setShowBiodata] = useState(false);

  const handleProfileClick = () => {
    setShowBiodata(!showBiodata);
  };

  return (
    <ChakraProvider>
      <div>
        <NavBar />
        <VStack spacing={8} align="center" paddingY={8}>
          <HStack spacing={8}>
            <Box
              className="box profile-box glass-box"
              onClick={handleProfileClick}
              p={4}
              borderRadius="8px"
              boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              cursor="pointer"
              bgGradient="linear(to-r, #F59E0B, #FEC34A)"
              _hover={{ bgGradient: "linear(to-r, #FEC34A, #F59E0B)" }}
              transition="background-color 0.3s ease"
            >
              <Heading size="md" color="white">
                Profile
              </Heading>
            </Box>
            <Box
              className="box available-tokens-box glass-box"
              p={4}
              borderRadius="8px"
              boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #3FCC6E, #2DD4BF)"
              _hover={{ bgGradient: "linear(to-r, #2DD4BF, #3FCC6E)" }}
              transition="background-color 0.3s ease"
            >
              <Heading size="md" color="white">
                Available Tokens
              </Heading>
            </Box>
            <Box
              className="box listed-tokens-box glass-box"
              p={4}
              borderRadius="8px"
              boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
              bgGradient="linear(to-r, #536DFE, #8C9EFF)"
              _hover={{ bgGradient: "linear(to-r, #8C9EFF, #536DFE)" }}
              transition="background-color 0.3s ease"
            >
              <Heading size="md" color="white">
                Listed Tokens
              </Heading>
            </Box>
          </HStack>
          {showBiodata && (
            <Box
            className="box biodata glass-box"
            p={4}
            borderRadius="8px"
            boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
            bgGradient="linear(to-r, #99EDC3, #60A5FA)"
            _hover={{ bgGradient: "linear(to-r, #60A5FA, #99EDC3)" }}
            transition="background-color 0.3s ease"
          >
            
            <Flex align="start" color="whiteAlpha.900">
              <VStack spacing={2} align="left">
                <Text>
                  <strong>Name:</strong>
                </Text>
                <Text>
                  <strong>Age:</strong>
                </Text>
                <Text>
                  <strong>Location:</strong>
                </Text>
                <Text>
                  <strong>Email:</strong>
                </Text>
                <Text>
                  <strong>Phone:</strong>
                </Text>
                <Text>
                  <strong>Industry:</strong>
                </Text>
                <Text>
                  <strong>Experience:</strong>
                </Text>
                <Text>
                  <strong>Other Details:</strong>
                </Text>
              </VStack>
          
              <VStack spacing={2} align="right" marginLeft="7rem">
                <Text>Tushar</Text>
                <Text>20</Text>
                <Text>New York</Text>
                <Text>tushar@gmail.com</Text>
                <Text>123-456-7890</Text>
                <Text>IT</Text>
                <Text>2 years</Text>
                <Text>Lorem Ipsum</Text>
              </VStack>
            </Flex>
          </Box>
          
          )}
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default UserPage;
