import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Stack,
  Flex,
  Progress,
  Select,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const TOTAL_STEPS = 4;

export default function CompleteProfile() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token, login } = useAuth();

  const progress = (step / TOTAL_STEPS) * 100;

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        type: "Point",
        coordinates: [pos.coords.longitude, pos.coords.latitude]
      });
    });
  };

  const submitProfile = async () => {
    setLoading(true);
    try {
      await api.post(
        "/user/complete-profile",
        { name, dateOfBirth, bloodGroup, location },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      login(token, true);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" bg="#F9FAFB" align="center" justify="center">
      <Box w="full" maxW="md">
        {/* Progress */}
        <Stack spacing={2} mb={6}>
          <HStack justify="space-between">
            <Text fontSize="sm" color="red.500" fontWeight="semibold">
              STEP {step} OF {TOTAL_STEPS}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {Math.round(progress)}% Complete
            </Text>
          </HStack>
          <Progress value={progress} colorScheme="red" rounded="full" />
        </Stack>

        {/* Card */}
        <Box bg="white" p={6} rounded="2xl" shadow="md">
          <Stack spacing={5}>
            {step === 1 && (
              <>
                <Heading size="md">What’s your full name?</Heading>
                <Input
                  placeholder="Type it here..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  colorScheme="red"
                  onClick={nextStep}
                  isDisabled={!name}
                >
                  Continue →
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Heading size="md">Your date of birth</Heading>
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <HStack>
                  <Button variant="ghost" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={nextStep}
                    isDisabled={!dateOfBirth}
                  >
                    Continue →
                  </Button>
                </HStack>
              </>
            )}

            {step === 3 && (
              <>
                <Heading size="md">Select your blood group</Heading>
                <Select
                  placeholder="Choose blood group"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Select>
                <HStack>
                  <Button variant="ghost" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={nextStep}
                    isDisabled={!bloodGroup}
                  >
                    Continue →
                  </Button>
                </HStack>
              </>
            )}

            {step === 4 && (
              <>
                <Heading size="md">Allow location access</Heading>
                <Text fontSize="sm" color="gray.600">
                  This helps us connect you with nearby donors and requests.
                </Text>

                <Button onClick={getLocation} variant="outline">
                  {location ? "Location Added ✓" : "Add Location"}
                </Button>

                <HStack>
                  <Button variant="ghost" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={submitProfile}
                    isDisabled={!location}
                    isLoading={loading}
                  >
                    Finish →
                  </Button>
                </HStack>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
