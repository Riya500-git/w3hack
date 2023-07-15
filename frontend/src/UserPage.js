import React, { useState } from "react";
import { Box, ChakraProvider, Heading, VStack, HStack, Table, Button, Text, Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

const UserPage = () => {
  const [showBiodata, setShowBiodata] = useState(false);
  const [showTokenTable, setShowTokenTable] = useState(false);

  const handleProfileClick = () => {
    setShowBiodata(!showBiodata);
    setShowTokenTable(false);
  };

  const handleTokenTableClick = () => {
    setShowTokenTable(!showTokenTable);
    setShowBiodata(false);
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
              onClick={handleTokenTableClick}
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
              onClick={handleTokenTableClick}
              cursor="pointer"

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
              cursor="pointer"

            >
              <Flex align="start" color="whiteAlpha.900">
                <VStack spacing={2} align="left">
                  <Text>
                    <strong>Name:</strong>
                  </Text>
                  <Text>
                    <strong>Public Address:</strong>
                  </Text>
                  <Text>
                    <strong>Balance:</strong>
                  </Text>
                  <Text>
                    <strong>Owned Token:</strong>
                  </Text>
                  <Text>
                    <strong>Email:</strong>
                  </Text>
                </VStack>

                <VStack spacing={2} align="right" marginLeft="7rem">
                  <Text>Tushar</Text>
                  <Text>Lorem Ipsum</Text>
                  <Text>Lorem Ipsum</Text>
                  <Text>Lorem Ipsum</Text>
                  <Text>tushar@gmail.com</Text>
                </VStack>
              </Flex>
            </Box>
          )}
          {showTokenTable && (
            <Box
            className="box form glass-box"
            p={4}
            borderRadius="8px"
            boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
            backgroundColor="blue.500"
            width="100%"
            maxWidth="600px"
            marginLeft="auto"
            marginRight="auto"
            marginTop="2rem"
            marginBottom="2rem"
            cursor="pointer"
            bgGradient="linear(to-r, #99EDC3, #60A5FA)"
            _hover={{ bgGradient: "linear(to-r, #60A5FA, #99EDC3)" }}
            transition="background-color 0.3s ease"
          >
              <Table variant="simple" width="100%" height="200px" color="white">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Number of Tokens</th>
                    <th>List Button</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Carbon</td>
                    <td>1000</td>
                    <td>
                      <Button colorScheme="teal" size="lg">
                        Button
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Box>
          )}
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default UserPage;
