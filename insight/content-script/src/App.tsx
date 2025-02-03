/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import axios from "axios";
import { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";

import ResultDisplay from "./ResultDisplay";

interface AppProps {
  tweetText: string;
}

export type FactCheckResponse = {
  type: "true" | "false" | "unverifiable";
  confidence: number;
  description: string;
};

export default function App({ tweetText }: AppProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<FactCheckResponse | null>(
    null
  );
  const toast = useToast();

  const makeRequest = async () => {
    setIsChecking(true);
    const BACKEND_URL = "http://localhost:8000/fact-check";

    const result = await axios.post<FactCheckResponse>(BACKEND_URL, {
      text: tweetText,
    });

    if (result.status === 200) {
      setCheckResult(result.data);
      setIsChecking(false);
    } else {
      console.error(result.data);
      toast({
        title: "Error",
        description:
          "An error occurred while checking the fact. " + result.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="App">
      {checkResult ? (
        <ResultDisplay {...checkResult} />
      ) : (
        <Button
          colorScheme="blue"
          isLoading={isChecking}
          loadingText="Checking..."
          spinnerPlacement="end"
          onClick={makeRequest}
        >
          Fact Check
        </Button>
      )}
    </div>
  );
}
