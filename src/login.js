import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VStack, Radio, Button, Flex, Box, Heading } from "@chakra-ui/react";
import UserPage from "./UserPage";

const LoginPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === "page1") {
    } else if (selectedOption === "page2") {
    } else if (selectedOption === "page3") {
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg="gray.100">
      <Box width="400px" height="400px" bg="white" p={6} borderRadius="md" boxShadow="md" textAlign="center">
        <Heading size="md" color="gray.800" mb={4}>
          Login
        </Heading>
        <VStack spacing={5}>
          <Radio
            value="page1"
            isChecked={selectedOption === "page1"}
            onChange={handleOptionChange}
          >
            Forest
          </Radio>
          <Radio
            value="page2"
            isChecked={selectedOption === "page2"}
            onChange={handleOptionChange}
          >
            User
          </Radio>
          <Radio
            value="page3"
            isChecked={selectedOption === "page3"}
            onChange={handleOptionChange}
          >
            Carbon Company
          </Radio>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
