import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VStack, Radio, Button, Flex, Box, Heading } from "@chakra-ui/react";
import image from "./8310471.jpg";

const LoginPage = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === "page1") {
      props.login();
      navigate("/Mint");
    } else if (selectedOption === "page2") {
      props.login();
      navigate("/UserPage");
    } else if (selectedOption === "page3") {
      props.login();
      navigate("/Mint");
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      bgImage={`url(${image})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box width="400px" bg="blue.500" p={6} borderRadius="md" boxShadow="md" textAlign="center">
        <Heading size="md" color="white" mb={4}>
          Login
        </Heading>
        <VStack spacing={5} align="start" color="white">
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
