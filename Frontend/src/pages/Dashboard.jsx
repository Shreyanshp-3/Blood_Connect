import React from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  Switch,
  Stack,
  Button,
  HStack,
  VStack,
  Badge,
  Divider,
  Avatar,
  Icon,
  useColorModeValue,
  Progress,
  IconButton
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  Settings,
  History,
  Edit3,
  Droplet,
  MoreHorizontal,
  MapPin,
  Trophy,
  Activity,
  LogOut
} from "lucide-react";


//dynamic data fetching 
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// const { token } = useAuth();


// const [user, setUser] = useState(null);
// const [donorActive, setDonorActive] = useState(false);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/user/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUser(res.data);
//       setDonorActive(res.data.isDonorActive);
//     } catch (err) {
//       console.error("Failed to load user", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUser();
// }, []);


// // handle toggle

// const handleDonorToggle = async (e) => {
//   const nextValue = e.target.checked;
//   setDonorActive(nextValue); // optimistic update

//   try {
//     await api.patch(
//       "/user/donor-status",
//       { isDonorActive: nextValue },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   } catch (err) {
//     console.error("Failed to update donor status");
//     setDonorActive(!nextValue); // rollback
//   }
// };

/////////////////////////

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

export default function Dashboard() {
  const bg = useColorModeValue("#F4F6F8", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");


  ////dynamic data loader
  const { token } = useAuth();

  const [user, setUser] = useState(null);
  const [donorActive, setDonorActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setDonorActive(res.data.isDonorActive);
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleDonorToggle = async (e) => {
    const nextValue = e.target.checked;
    setDonorActive(nextValue);

    try {
      await api.patch(
        "/user/donor-status",
        { isDonorActive: nextValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to update donor status",err);
      setDonorActive(!nextValue);
    }
  };

  if (loading || !user) return null;


  if (loading || !user) return null;
  return (
    <Flex minH="100vh" bg={bg} direction="column" fontFamily="Inter, sans-serif">
      {/* HEADER */}
      <Flex
        px={8}
        py={4}
        bg={cardBg}
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.100"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <HStack spacing={4}>
          <Flex
            w={10} h={10}
            bgGradient="linear(to-br, red.400, red.600)"
            rounded="xl"
            align="center"
            justify="center"
            shadow="lg"
          >
            <Icon as={Droplet} color="white" fill="white" w={5} h={5} />
          </Flex>
          <Box>
            <Text fontWeight="800" fontSize="lg" lineHeight="1">BloodConnect</Text>
            <Text fontSize="10px" fontWeight="bold" letterSpacing="1px" color="gray.400" textTransform="uppercase">
              Premium Dashboard
            </Text>
          </Box>
        </HStack>

        <HStack spacing={6}>
          <HStack spacing={2} bg="green.50" px={3} py={1} rounded="full">
            <Box w={2} h={2} bg="green.400" rounded="full" />
            <Text fontSize="xs" fontWeight="bold" color="green.700">System Online</Text>
          </HStack>
          <HStack spacing={4}>
            <IconButton aria-label="Notifications" icon={<Bell size={20} />} variant="ghost" rounded="full" />
            <Avatar size="sm" src="https://bit.ly/dan-abramov" name="Admin" />
          </HStack>
        </HStack>
      </Flex>

      {/* MAIN CONTENT */}
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        p={{ base: 4, lg: 8 }}
        flex="1"
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "280px 1fr 320px" }}
          gap={8}
          h="full"
        >
          {/* LEFT PANEL */}
          <Stack spacing={6}>
            {/* Status Card */}
            <Card variants={itemVariants}>
              <Flex justify="space-between" align="start" mb={2}>
                <Box>
                  <Text fontWeight="bold" fontSize="lg">Status</Text>
                  <Text fontSize="xs" color="gray.500">Visibility settings</Text>
                </Box>
                <Icon as={Activity} color="gray.300" />
              </Flex>

              <Flex bg="gray.50" p={3} rounded="xl" justify="space-between" align="center" mb={4}>
                <Text fontSize="sm" fontWeight="600">Active Donor</Text>
                {/* <Switch colorScheme="red" size="lg" defaultChecked /> */}
                <Switch
                  colorScheme="red"
                  size="lg"
                  isChecked={donorActive}
                  onChange={handleDonorToggle}
                />
              </Flex>

              <HStack spacing={3}>
                <PulseDot />
                {/* <Text fontSize="xs" fontWeight="bold" color="red.500" letterSpacing="wide">
                  LIVE SIGNAL BROADCASTING
                </Text> */}

                <Text fontSize="xs" fontWeight="bold" color={donorActive ? "red.500" : "gray.400"}>
                  {donorActive
                    ? "VISIBLE TO PEOPLE IN NEED"
                    : "NOT VISIBLE ON RADAR"}
                </Text>


              </HStack>
            </Card>

            {/* Circular Stats */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <CircularStat
                label="Donations"
                // value="12"
                value={user.stats?.donations || 0}

                color="#E53E3E" // Red
                trackColor="#FED7D7"
                percentage={75}
                variants={itemVariants}
              />
              <CircularStat
                label="Requests"
                value="3"
                color="#3182CE" // Blue
                trackColor="#BEE3F8"
                percentage={25}
                variants={itemVariants}
              />
            </Grid>

            {/* Cooldown */}
            <Card variants={itemVariants}>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="bold">Cooldown</Text>
                <Icon as={Settings} size={14} color="gray.300" />
              </Flex>
              <Progress value={100} size="xs" colorScheme="green" rounded="full" mb={2} />
              <Text fontSize="xs" color="green.500" fontWeight="bold" textAlign="right">
                Ready to donate
              </Text>
            </Card>

            {/* Achievements */}
            <Card variants={itemVariants}>
              <Text fontSize="sm" fontWeight="bold" mb={3}>Achievements</Text>
              <HStack spacing={3}>
                <AchievementIcon icon={Droplet} active />
                <AchievementIcon icon={Trophy} active />
                <AchievementIcon icon={MapPin} />
                <Box
                  w={8} h={8} rounded="full" border="1px dashed" borderColor="gray.300"
                  display="flex" alignItems="center" justifyContent="center" fontSize="xs" color="gray.400"
                >+</Box>
              </HStack>
            </Card>
          </Stack>

          {/* CENTER RADAR */}
          <Card h="full" minH="500px" position="relative" overflow="hidden" p={0} variants={itemVariants}>
            <RadarSystem />
          </Card>

          {/* RIGHT PANEL */}
          <Stack spacing={6}>
            {/* Profile Card */}
            <Card variants={itemVariants} textAlign="center" pt={8} pb={6}>
              <Icon as={MoreHorizontal} position="absolute" top={4} right={4} color="gray.400" cursor="pointer" />

              <Flex justify="center" align="center" position="relative" mb={4}>
                <Box p={1} border="2px dashed" borderColor="red.200" rounded="2xl">
                  <Avatar size="xl" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=176&q=80" name="John Doe" borderRadius="xl" />

                </Box>
                <Badge
                  position="absolute"
                  top={0}
                  right="25%"
                  bg="red.500"
                  color="white"
                  px={2}
                  py={1}
                  rounded="lg"
                  fontSize="md"
                  boxShadow="md"
                >
                  {/* O+ */}
                  <Badge>{user.bloodGroup}</Badge>

                </Badge>
              </Flex>

              {/* <Text fontWeight="800" fontSize="xl">John Doe</Text> */}
              <Text fontWeight="800" fontSize="xl">{user.name}</Text>

              <HStack justify="center" spacing={1} color="gray.500" mb={6}>
                <MapPin size={14} />
                {/* <Text fontSize="xs" fontWeight="500">Manhattan, NY</Text> */}
                <Text fontSize="xs">{user.location?.city || "Your area"}</Text>

              </HStack>

              <Grid templateColumns="repeat(2, 1fr)" gap={3} bg="gray.50" p={3} rounded="xl">
                <Box>
                  <Text fontSize="10px" color="gray.400" fontWeight="bold" textTransform="uppercase">Last Donation</Text>
                  {/* <Text fontWeight="bold" fontSize="sm">Oct 24, 2023</Text> */}
                  <Text fontWeight="bold" fontSize="sm">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </Text>

                </Box>
                <Box borderLeft="1px solid" borderColor="gray.200">
                  <Text fontSize="10px" color="gray.400" fontWeight="bold" textTransform="uppercase">Impact</Text>
                  <Text fontWeight="bold" fontSize="sm" color="green.500">36 Lives</Text>
                </Box>
              </Grid>
            </Card>

            {/* Quick Access */}
            <Card variants={itemVariants}>
              <Text fontWeight="bold" fontSize="sm" mb={4} color="gray.400" textTransform="uppercase" letterSpacing="wide">
                Quick Access
              </Text>
              <Stack spacing={2}>
                <QuickItem icon={Edit3} text="Edit Profile" />
                <QuickItem icon={History} text="Donation History" />
                <QuickItem icon={Settings} text="Settings" />
              </Stack>
            </Card>

            {/* Actions */}
            <MotionBox variants={itemVariants}>
              <Button
                w="full"
                size="lg"
                bgGradient="linear(to-r, red.500, red.600)"
                color="white"
                _hover={{ bgGradient: "linear(to-r, red.600, red.700)", boxShadow: "xl", transform: "translateY(-2px)" }}
                _active={{ transform: "translateY(0)" }}
                shadow="lg"
                leftIcon={<Droplet fill="white" />}
                mb={3}
              >
                Request Blood
              </Button>
              <Button
                w="full"
                variant="ghost"
                color="gray.500"
                fontSize="sm"
                leftIcon={<LogOut size={16} />}
              >
                Sign Out
              </Button>
            </MotionBox>
          </Stack>
        </Grid>
      </MotionBox>
    </Flex >
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ children, ...props }) {
  return (
    <MotionBox
      bg="white"
      p={5}
      rounded="2xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      position="relative"
      whileHover={{ y: -4, boxShadow: "lg" }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

function PulseDot() {
  return (
    <Box position="relative" w={3} h={3}>
      <Box w={3} h={3} bg="red.500" rounded="full" position="absolute" zIndex={2} />
      <MotionBox
        w={3}
        h={3}
        bg="red.500"
        rounded="full"
        position="absolute"
        zIndex={1}
        animate={{ scale: [1, 3], opacity: [0.8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
      />
    </Box>
  );
}

function CircularStat({ label, value, color, trackColor, percentage, variants }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={6}
      variants={variants}
    >
      <Box position="relative" w="80px" h="80px" mb={3}>
        {/* SVG Ring */}
        <svg width="80" height="80" viewBox="0 0 60 60">
          <circle
            cx="30" cy="30" r={radius}
            stroke={trackColor}
            strokeWidth="4"
            fill="transparent"
            opacity="0.3"
          />
          <motion.circle
            cx="30" cy="30" r={radius}
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference} // Start empty
            strokeLinecap="round"
            transform="rotate(-90 30 30)"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
        </svg>

        <Flex position="absolute" top="0" left="0" w="full" h="full" align="center" justify="center" direction="column">
          <Text fontSize="2xl" fontWeight="800" lineHeight="1">{value}</Text>
        </Flex>
      </Box>
      <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="0.5px">
        {label}
      </Text>
    </Card>
  );
}

function AchievementIcon({ icon, active }) {
  return (
    <Flex
      w={8} h={8}
      rounded="full"
      bg={active ? "blue.50" : "gray.50"}
      color={active ? "blue.500" : "gray.300"}
      align="center"
      justify="center"
    >
      <Icon as={icon} size={14} fill={active ? "currentColor" : "none"} />
    </Flex>
  )
}

function QuickItem({ icon, text }) {
  return (
    <HStack
      p={3}
      rounded="xl"
      justify="space-between"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ bg: "gray.50", transform: "translateX(4px)" }}
    >
      <HStack spacing={3}>
        <Flex w={8} h={8} bg="gray.100" rounded="lg" align="center" justify="center" color="gray.600">
          <Icon as={icon} size={16} />
        </Flex>
        <Text fontSize="sm" fontWeight="600" color="gray.700">{text}</Text>
      </HStack>
      <Icon as={MoreHorizontal} size={16} color="gray.300" />
    </HStack>
  );
}

/* ---------------- RADAR SYSTEM ---------------- */

function RadarSystem() {
  return (
    <Flex align="center" justify="center" h="100%" w="100%" bg="#FAFAFA" position="relative">

      {/* Background Grid Pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.4}
        style={{
          backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radar Circles */}
      <Box position="relative" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            position="absolute"
            w={`${i * 180}px`}
            h={`${i * 180}px`}
            border="1px solid"
            borderColor="gray.200"
            rounded="full"
            opacity={0.7}
          />
        ))}

        {/* Central User */}
        <Box position="relative" zIndex={5}>
          <MotionBox
            w={24} h={24}
            bg="blue.50"
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animate={{ boxShadow: ["0 0 0 0px rgba(66, 153, 225, 0.4)", "0 0 0 20px rgba(66, 153, 225, 0)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Avatar size="md" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=176&q=80" />
          </MotionBox>
        </Box>

        {/* Pinging Dots (Requests/Donors) */}
        <RadarBlip top="20%" left="60%" color="red.400" delay={0} />
        <RadarBlip top="70%" left="30%" color="red.500" delay={1.5} />
        <RadarBlip top="40%" left="80%" color="red.300" delay={2.5} />
      </Box>

      {/* Floating Labels */}
      <Box position="absolute" bottom={6} right={6} bg="white" p={2} rounded="lg" shadow="md">
        <Stack spacing={2}>
          <HStack>
            <Box w={2} h={2} bg="red.500" rounded="full" />
            <Text fontSize="xs" fontWeight="bold">Urgent Request</Text>
          </HStack>
          <HStack>
            <Box w={2} h={2} bg="red.300" rounded="full" />
            <Text fontSize="xs" fontWeight="bold" color="gray.500">Standard Request</Text>
          </HStack>
        </Stack>
      </Box>

    </Flex>
  );
}

function RadarBlip({ top, left, color, delay }) {
  return (
    <Box position="absolute" top={top} left={left} zIndex={4}>
      <MotionBox
        w={4} h={4} bg={color} rounded="full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
        transition={{ duration: 0.5, delay: delay }}
      />
      <MotionBox
        position="absolute" top={0} left={0}
        w={4} h={4} bg={color} rounded="full"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ repeat: Infinity, duration: 2, delay: delay }}
      />
    </Box>
  )
}