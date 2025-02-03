/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Button } from "@chakra-ui/react";
import { useState } from "react";
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

  const makeRequest = async () => {
    setIsChecking(true);
    const BACKEND_URL = "http://localhost:8000/fact-check";

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: tweetText }),
    });

    const data = await response.json();
    if (response.ok) setCheckResult(data);
    else console.error(data);

    setIsChecking(false);
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
          Fact-Check
        </Button>
      )}
    </div>
  );
}
