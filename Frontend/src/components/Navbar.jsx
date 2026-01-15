import { Flex, Box, Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Flex
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg="brand.500"
      color="white"
    >
      <Box fontWeight="bold">BloodConnect</Box>

      {token && (
        <Button size="sm" colorScheme="whiteAlpha" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Flex>
  );
}
