import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Stack,
  Flex,
  HStack,
  Icon,
  FormControl,
  FormLabel,
  useColorModeValue,
  Container
} from "@chakra-ui/react";
import {
  HeartPulse,
  MapPin,
  Users,
  Lock,
  ArrowRight,
  Settings,
  Droplet
} from "lucide-react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, token, isProfileComplete } = useAuth();

  const bg = useColorModeValue("white", "gray.900");
  const secondaryText = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    if (token) {
      navigate(isProfileComplete ? "/dashboard" : "/complete-profile", {
        replace: true
      });
    }
  }, [token, isProfileComplete, navigate]);

  const sendOtp = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      await api.post("/auth/send-otp", { phone });
      setOtpSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { phone, otp });
      login(res.data.token, res.data.isProfileComplete);
      if (res.data.isProfileComplete) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/complete-profile", { replace: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      bg={bg}
      position="relative"
      /* Changed overflow to auto on base to allow scrolling on small screens */
      overflowY={{ base: "auto", lg: "hidden" }}
      overflowX="hidden"
      fontFamily="Inter, sans-serif"
    >
      {/* Header Logo Area */}
      <Box position="absolute" top={6} left={{ base: 6, lg: 12 }} zIndex={10}>
        <HStack spacing={2}>
          <Icon as={Droplet} fill="#E53E3E" color="#E53E3E" w={6} h={6} />
          <Text fontWeight="800" fontSize="xl">BloodConnect</Text>
        </HStack>
      </Box>

      <Box position="absolute" top={6} right={{ base: 6, lg: 12 }} zIndex={10}>
        <Icon as={Settings} color="gray.400" />
      </Box>

      {/* Main Container */}
      {/* Changed height to auto on mobile so content isn't cut off */}
      <Container 
        maxW="7xl" 
        h={{ base: "auto", lg: "100vh" }} 
        px={{ base: 6, lg: 12 }}
        py={{ base: 24, lg: 0 }} // Add top padding on mobile
      >
        <Flex 
          h="full" 
          direction={{ base: "column", lg: "row" }} 
          align="center" 
          justify="space-between"
          gap={{ base: 12, lg: 0 }} // Add gap between text and login box on mobile
        >

          {/* LEFT CONTENT */}
          <Box flex="1" maxW="lg">
            <Heading
              as="h1"
              size={{ base: "2xl", lg: "3xl" }} // Smaller heading on mobile
              lineHeight="1.1"
              fontWeight="900"
              mb={6}
              letterSpacing="-1px"
            >
              Saving lives, <br />
              <Text as="span" color="red.600">
                one connection
              </Text>{" "}
              at a time.
            </Heading>

            <Text fontSize={{ base: "md", lg: "lg" }} color={secondaryText} mb={10} lineHeight="1.6">
              A fast, community-driven platform to connect blood donors and
              patients during emergencies. Join the network today.
            </Text>

            <Stack spacing={6}>
              <Feature
                icon={HeartPulse}
                title="Emergency Focused"
                text="Respond instantly when someone nearby needs blood with real-time alerts."
              />
              <Feature
                icon={MapPin}
                title="Smart Location Matching"
                text="Connect seamlessly with donors and requests specifically within your area."
              />
              <Feature
                icon={Users}
                title="People-Powered Network"
                text="Anyone can donate or request — no fixed roles, just a helping community."
              />
            </Stack>
          </Box>

          {/* RIGHT LOGIN CARD */}
          <Box
            flex="1"
            display="flex"
            flexDirection="column" // Stack card and security badge
            alignItems={{ base: "center", lg: "flex-end" }}
            justifyContent="center"
            w="full"
          >
            <Box
              bg="white"
              p={{ base: 6, md: 8 }} // Less padding on small screens
              rounded="3xl"
              shadow="2xl"
              w="full"
              maxW="400px"
              border="1px solid"
              borderColor="gray.100"
              position="relative"
              zIndex={2}
            >
              <Stack spacing={6}>
                <Box>
                  <Heading size="lg" fontWeight="800" mb={2}>Get Started</Heading>
                  <Text fontSize="sm" color="gray.500">
                    Login securely using your phone number to access the donor network.
                  </Text>
                </Box>

                <FormControl>
                  <FormLabel fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>Phone Number</FormLabel>
                  <Input
                    size="lg"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: "red.500", boxShadow: "none" }}
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isDisabled={otpSent}
                    rounded="lg"
                    fontSize="md"
                  />
                </FormControl>

                {otpSent && (
                  <FormControl>
                    <FormLabel fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>One Time Password</FormLabel>
                    <Input
                      size="lg"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      _focus={{ borderColor: "red.500", boxShadow: "none" }}
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      rounded="lg"
                      fontSize="md"
                      textAlign="center"
                      letterSpacing="4px"
                    />
                  </FormControl>
                )}

                {!otpSent ? (
                  <Button
                    colorScheme="red"
                    bg="red.600"
                    size="lg"
                    h="56px"
                    rounded="lg"
                    fontSize="md"
                    fontWeight="bold"
                    onClick={sendOtp}
                    isLoading={loading}
                    _hover={{ bg: "red.700" }}
                    rightIcon={<ArrowRight size={20} />}
                  >
                    Send OTP
                  </Button>
                ) : (
                  <Button
                    colorScheme="red"
                    bg="red.600"
                    size="lg"
                    h="56px"
                    rounded="lg"
                    fontSize="md"
                    fontWeight="bold"
                    onClick={verifyOtp}
                    isLoading={loading}
                    _hover={{ bg: "red.700" }}
                  >
                    Verify & Continue
                  </Button>
                )}

                <Text fontSize="10px" color="gray.400" textAlign="center" lineHeight="1.5">
                  By continuing, you agree to our{" "}
                  <Text as="span" color="red.500" cursor="pointer" fontWeight="semibold">
                    Terms of Service
                  </Text>{" "}
                  &{" "}
                  <Text as="span" color="red.500" cursor="pointer" fontWeight="semibold">
                    Privacy Policy.
                  </Text>
                </Text>
              </Stack>
            </Box>

            {/* Security Badge - Integrated into flow for mobile, Absolute for desktop */}
            <Box 
                mt={{ base: 8, lg: 0 }}
                position={{ base: "relative", lg: "absolute" }} 
                bottom={{ base: "auto", lg: 8 }} 
                right={{ base: "auto", lg: "16%" }} 
                textAlign="center"
            >
                <HStack justify="center" spacing={2} fontSize="xs" color="green.600" fontWeight="600">
                <Icon as={Lock} size={12} />
                <Text>Secure & Encrypted</Text>
                </HStack>
            </Box>
          </Box>
        </Flex>
      </Container>


      {/* Background Wave Graphic */}
      <Box
        position="absolute"
        bottom={0}
        right={0}
        w="100%"
        h={{ base: "20%", lg: "30%" }} // Reduced height on mobile
        zIndex={0}
        bgGradient="linear(to-t, red.50, transparent)"
        style={{
          clipPath: "ellipse(80% 60% at 70% 100%)"
        }}
      />
    </Flex>
  );
}

function Feature({ icon, title, text }) {
  return (
    <HStack align="start" spacing={5}>
      <Flex
        w={12}
        h={12}
        bg="red.50"
        rounded="full"
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Icon as={icon} color="red.500" size={20} />
      </Flex>
      <Box pt={1}>
        <Text fontWeight="bold" fontSize="md" mb={1}>{title}</Text>
        <Text fontSize="sm" color="gray.500" lineHeight="1.5">
          {text}
        </Text>
      </Box>
    </HStack>
  );
}