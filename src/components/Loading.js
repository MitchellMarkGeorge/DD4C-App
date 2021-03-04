import { Spinner} from "evergreen-ui";
import React from "react";
import Box from "ui-box";
import Center from "./Center";

export default function Loading() {
  return (
    <Center>
      <Box textAlign="center">
         <Spinner size={36}/>
      </Box>
    </Center>
  );
}
