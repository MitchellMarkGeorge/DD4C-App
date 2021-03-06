import React from "react";
import Box from "ui-box";
import { Heading, Paragraph, Button } from "evergreen-ui";
import { ROUTES } from "../services/routes";

export default function Error(props) {
  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      backgroundColor="#EC4C47"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color="#47B881"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Heading fontWeight="bold" size={800} color="#fff" marginBottom="1rem">
          Error
        </Heading>

        <Paragraph color="#fff" marginBottom="1rem">
          There was an error. The student's code might already be scanned. Try and
          scan the code again.
        </Paragraph>

        <Button
          intent="danger"
          onClick={() => props.history.push(ROUTES.SCANNER)}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
