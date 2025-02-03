import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  useToast,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";

import type { FactCheckResponse } from "./App";

const SECOND = 1000;

const InfoComponent = (data: FactCheckResponse) => {
  const renderData = {
    true: {
      color: "green.300",
      icon: <CheckCircleIcon />,
      text: "Verified!",
    },
    false: {
      color: "red.300",
      icon: <WarningIcon />,
      text: "False News!",
    },
    unverifiable: {
      color: "gray.300",
      icon: <InfoIcon />,
      text: "Unverifiable...",
    },
  };

  return (
    <Box color={renderData[data.type]["color"]} padding="1rem">
      <Flex dir="row" align="center">
        {renderData[data.type]["icon"]}
        <Heading size="sm">{renderData[data.type]["text"]}</Heading>
      </Flex>

      <Flex dir="row" align="center">
        <Heading size="xs" as="span">
          Confidence:{" "}
        </Heading>
        <Progress hasStripe value={data.confidence} />
      </Flex>

      <Text fontSize="xs">{data.description}</Text>
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
        False News!
      </Button>
    );
  }

  return (
    <Button leftIcon={<InfoIcon />} colorScheme="grey" onClick={onClick}>
      Unverifiable...
    </Button>
  );
}
