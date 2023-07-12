import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Link,
  ChakraProvider,
} from "@chakra-ui/react";

const SignupPage = ({ handleSignup, goToLoginPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignupClick = () => {
    handleSignup({ email, password, name, phoneNumber });
  };

  return (
    <Box
      width="400px"
      backgroundColor="gray.700"
      borderRadius="8px"
      p={6}
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      textAlign="center"
    >
      <Heading size="md" color="white" mb={4}>
        Signup
      </Heading>
      <Flex justifyContent="center" mb={4}>
        <Button variant="ghost" colorScheme="blue" size="sm" mr={2}>
          User
        </Button>
        <Button variant="ghost" colorScheme="blue" size="sm">
          Carbon
        </Button>
      </Flex>
      <Box as="form" onSubmit={handleSignupClick}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={4}
          variant="filled"
          size="md"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
          variant="filled"
          size="md"
        />
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={4}
          variant="filled"
          size="md"
        />
        <Input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          mb={4}
          variant="filled"
          size="md"
        />
        <Button
          type="submit"
          colorScheme="blue"
          borderRadius="8px"
          color="white"
          cursor="pointer"
          width="100%"
        >
          Signup
        </Button>
      </Box>
      <Text mt={4} color="white">
        Already registered?{" "}
        <Link color="blue.500" onClick={goToLoginPage}>
          Login here
        </Link>
      </Text>
    </Box>
  );
};

const LoginPage = ({ handleLogin, goToSignupPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    handleLogin({ email, password });
  };

  return (
    <Box
      width="400px"
      backgroundColor="gray.500"
      borderRadius="8px"
      p={6}
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      textAlign="center"
    >
      <Heading size="md" color="white" mb={4}>
        Login
      </Heading>
      <Flex justifyContent="center" mb={4}>
        <Button variant="ghost" colorScheme="blue" size="sm">
          User
        </Button>
        <Button variant="ghost" colorScheme="blue" size="sm" mr={2}>
          Carbon
        </Button>
      </Flex>
      <Box as="form" onSubmit={handleLoginClick}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={4}
          variant="filled"
          size="md"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
          variant="filled"
          size="md"
        />
        <Button
          type="submit"
          colorScheme="blue"
          borderRadius="8px"
          color="white"
          cursor="pointer"
          width="100%"
        >
          Login
        </Button>
      </Box>
      <Text mt={4} color="white">
        Not registered yet?{" "}
        <Link color="blue.500" onClick={goToSignupPage}>
          Signup here
        </Link>
      </Text>
    </Box>
  );
};

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [memberType, setMemberType] = useState("club");
  const [user, setUser] = useState(null);
  const [signupPage, setSignupPage] = useState(false);

  const handleSignup = (userData) => {
    console.log("Signup:", userData);
    setUser(userData);
    setLoggedIn(true);
  };

  const handleLogin = (credentials) => {
    console.log("Login:", credentials);
    setUser(credentials);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  const goToLoginPage = () => {
    setSignupPage(false);
  };

  const goToSignupPage = () => {
    setSignupPage(true);
  };

  let content;

  if (signupPage) {
    content = (
      <SignupPage handleSignup={handleSignup} goToLoginPage={goToLoginPage} />
    );
  } else {
    content = (
      <LoginPage handleLogin={handleLogin} goToSignupPage={goToSignupPage} />
    );
  }

  return (
    <ChakraProvider>
      <Flex
        className="container"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        fontFamily="Arial, sans-serif"
        bg="gray.800"
      >
        {content}
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
