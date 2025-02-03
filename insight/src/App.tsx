/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Box, Divider, Image, Text } from "@chakra-ui/react";

function App() {
  return (
    <Box textAlign="center" padding="1rem" width="fit-content" minWidth="300px">
      <Text fontSize="xl" marginBottom="0.5">
        Fact-Check the Internet With
      </Text>
      <Image src="/logo.png" height="12rem" width="12rem" />
      <Divider borderColor="orange" marginBottom="0.5" />
      <Text fontSize="md">
        Insight is a real-time fact-checking tool powered by advanced AI & RAG
        models to help you verify the information you read online.
      </Text>
    </Box>
  );
}

export default App;
