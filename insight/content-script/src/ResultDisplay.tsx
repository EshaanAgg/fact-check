import { Box, Button, Flex, Heading, useToast, Text } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";

import type { FactCheckResponse } from "./App";

const SECOND = 1000;

const InfoComponent = (data: FactCheckResponse) => {
  const renderData = {
    true: {
      color: "green",
      icon: <CheckCircleIcon />,
      text: "Verified!",
    },
    false: {
      color: "red",
      icon: <WarningIcon />,
      text: "False News!",
    },
    unverifiable: {
      color: "black",
      icon: <InfoIcon />,
      text: "Unverifiable!",
    },
  };

  return (
    <Box
      color="white"
      bg={renderData[data.type]["color"]}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Flex dir="row" align="center">
        {renderData[data.type]["icon"]}
        <Heading size="md" p="1">
          {renderData[data.type]["text"]}
        </Heading>
      </Flex>

      <Text fontSize="md" p="1">
        Confidence: {data.confidence}%
      </Text>

      <Text fontSize="sm" p="1">
        {data.description}
      </Text>
    </Box>
  );
};

export default function ResultDisplay(props: FactCheckResponse) {
  const toast = useToast();
  const toastId = "fact-check-toast";

  const onClick = () => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        position: "top-right",
        isClosable: true,
        duration: 10 * SECOND,
        render: () => {
          return <InfoComponent {...props} />;
        },
      });
    }
  };

  if (props.type === "true") {
    return (
      <Button
        leftIcon={<CheckCircleIcon />}
        colorScheme="green"
        onClick={onClick}
      >
        Verified!
      </Button>
    );
  }

  if (props.type === "false") {
    return (
      <Button leftIcon={<WarningIcon />} colorScheme="red" onClick={onClick}>
        False Facts!
      </Button>
    );
  }

  return (
    <Button leftIcon={<InfoIcon />} colorScheme="grey" onClick={onClick}>
      Unverifiable!
    </Button>
  );
}
