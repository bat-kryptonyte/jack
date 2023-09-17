import React from "react";
import {
  Box,
  Flex,
  Link,
  Heading,
  Text,
  IconButton,
  Button,
  Container,
  Image,
  Icon,
} from "@chakra-ui/react";
import {
  FaArrowCircleRight,
} from "react-icons/fa";


const Home: React.FC = () => {

  return (
    <Box bg="#F9FAFC">
      <Flex
        as="nav"
        align="center"
        justify="center"
        wrap="wrap"
        padding={6}
        bg="teal.500"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Box
          flexBasis={{ base: "100%", md: "auto" }}
          flexGrow={1}
          textAlign={{ base: "center", md: "left" }}
        >
          <Link href="/">
            <Image src="/duck-contour-final.png" alt="Logo" maxW="150px" />
          </Link>
        </Box>
        <Box flexBasis={{ base: "100%", md: "auto" }}>
          <Flex align="center">
            <Heading fontSize="2s" color="white" mr={2}>
              Try out our Demo!
            </Heading>
            <Link href="/home" title="Go to interface">
              <Icon as={FaArrowCircleRight} w={6} h={6} color="white" />
            </Link>
          </Flex>
        </Box>
      </Flex>

      <Box as="section" bg="gray.100" py={10}>
        <Container maxW="container.md">
          <Flex direction="column" align="center">
            <Heading as="h1" size="xl">
              JackAI: Accessible Physical Therapy for All
            </Heading>


            
          </Flex>
        </Container>
      </Box>

      <Box fontWeight="bold" as="section" py={10}>
        <Container maxW="container.md">
          <Flex direction="column" align="center">
            <Heading as="h2" size="lg">
              Abstract
            </Heading>

            <Flex direction="column" mt={4} w="full">
              <Text textAlign="justify" mt={4}>
                Large Language Models (LLMs) have demonstrated remarkable
                performance on various quantitative reasoning and knowledge
                benchmarks, such as MMLU and MATH. However, many of these
                benchmarks are losing utility as LLMs get increasingly high
                scores, despite not yet achieving expert level performance in
                these domains. We introduce ARB, a novel benchmark composed of
                advanced reasoning problems designed to evaluate LLMs on text
                comprehension and expert domain reasoning. ARB presents a more
                challenging test than prior benchmarks, featuring questions that
                test deeper knowledge of mathematics, physics, biology,
                chemistry, and law.
              </Text>

              <Text textAlign="justify" mt={4}>
                As a subset of ARB, we introduce a challenging set of math and
                physics problems which require advanced symbolic reasoning and
                domain knowledge. In order to improve both automatic and
                assisted symbolic evaluation capabilities, we introduce a
                rubric-based self-evaluation approach, allowing GPT-4 to score
                its own intermediate reasoning steps.
              </Text>

              <Text textAlign="justify" mt={4}>
                We evaluated recent models such as GPT-4 and Claude on ARB and
                demonstrated that even with Chain-of-Thought prompting methods,
                current models score well below 50% on more demanding expert
                tasks. Further, we conducted a human evaluation of the symbolic
                subset of ARB, finding close agreement between annotators and
                GPT-4 self-evaluation scores.
              </Text>
            </Flex>
          </Flex>

          <br />
          <br />

         

          <br />
          <br />

         
          <br />
          <br />

          

          <br />
          <br />

          

          <br />
          <br />

         
        </Container>
      </Box>

      <Flex
        as="footer"
        align="center"
        justify="center"
        wrap="wrap"
        padding={6}
        bg="teal.500"
      >
        <Link
          href="https://github.com/TheDuckAI"
          color="white"
          textDecoration="underline"
          _hover={{ color: "white", textDecoration: "underline" }}
        >
          <Text fontWeight="bold" fontSize="md">
            Copyright © 2023 JackAI
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Home;