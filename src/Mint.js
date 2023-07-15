import React, { useState } from "react";
import { Table, Box, Flex, ChakraProvider, Heading, Text, Input, Textarea, Button, VStack, HStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

const Mint = () => {
  const [showMintForm, setShowMintForm] = useState(false);
  const [showAvailableTokensForm, setShowAvailableTokensForm] = useState(false);

  const handleMintTokenBoxClick = () => {
    setShowMintForm(!showMintForm);
    setShowAvailableTokensForm(false);
  };

  const handleAvailableTokensBoxClick = () => {
    setShowAvailableTokensForm(!showAvailableTokensForm);
    setShowMintForm(false);
  };

  return (
    <ChakraProvider>
      <div>
        <NavBar />
        <VStack spacing={8} align="center" paddingY={8}>
          <HStack spacing={8}>
            <Box
              className="box profile-box glass-box"
              p={4}
              borderRadius="8px"
              cursor="pointer"
              boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
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
              onClick={handleAvailableTokensBoxClick}
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
              onClick={handleMintTokenBoxClick}
              _hover={{ bgGradient: "linear(to-r, #8C9EFF, #536DFE)" }}
              transition="background-color 0.3s ease"
            >
              <Heading size="md" color="white">
                Mint Tokens
              </Heading>
            </Box>
          </HStack>
        {showMintForm && (
          <Box
          className="box form glass-box"
          p={4}
          borderRadius="8px"
          boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
          backgroundColor="#FFFFFF"
          width="100%"
          maxWidth="800px"
          marginLeft="auto"
          marginRight="auto"
          marginTop="2rem"
          marginBottom="2rem"
        >
          <VStack spacing={2} alignItems="flex-start">
            <Text color="blue.500">Name</Text>
            <Input
              type="text"
              placeholder=""
              variant="outline"
              borderColor="#76808A"
              width="500px"
            />
            <Text color="blue.500">Title</Text>
            <Input
              type="text"
              placeholder=""
              variant="outline"
              borderColor="#76808A"
              width="500px" 
            />
            <Text color="blue.500">Description</Text>
              <Textarea
                placeholder="Write a suitable description for your NFT"
                variant="outline"
                borderColor="#76808A"
              />
              <Text color="blue.500">Number Of Tokens</Text>

              <Input
                type="number"
                name="quantity"
                id="quantityInput"
                min="1"
                max="100"
                step="1"
                defaultValue="1"
                variant="outline"
                borderColor="#76808A"
              />
              <Button
                colorScheme="blue"
                backgroundColor="#2472FF"
                borderRadius="8px"
                color="white"
                cursor="pointer"
                width="200px"
                height="64px"
                fontSize="16px"
              >
                Submit
              </Button>
          </VStack>
        </Box>        
        )}
        {showAvailableTokensForm && (
          <Box
            className="box form glass-box"
            p={4}
            borderRadius="8px"
            boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
            backgroundColor="#FFFFFF"
            width="100%"
            maxWidth="600px"
            marginLeft="auto"
            marginRight="auto"
            marginTop="2rem"
            marginBottom="2rem"
          >
            <Table variant="simple" width="100%" height="200px">
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
                      <Button colorScheme="blue" size="lg">
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

export default Mint;
