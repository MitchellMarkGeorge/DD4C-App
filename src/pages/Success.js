import React from "react";
import Box from "ui-box";
import { Heading, Paragraph, Button } from "evergreen-ui";
import { ROUTES } from "../services/routes";

export default function Success(props) {
  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      backgroundColor="#47B881"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color="#47B881"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Heading fontWeight="bold" color="#fff" size={800} marginBottom="1rem">
          Scan Complete
        </Heading>

        <Paragraph color="#fff" marginBottom="1rem">
          The student's participation has been recorded.
        </Paragraph>

        <Button
          intent="success"
          onClick={() => props.history.push(ROUTES.SCANNER)}
        >
          Scan Another Student
        </Button>
      </Box>
    </Box>
  );
}
