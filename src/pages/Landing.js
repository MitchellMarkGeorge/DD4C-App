import React from "react";
import Center from "../components/Center";
import Box from "ui-box";
import { Heading, Button, Paragraph } from "evergreen-ui";
import { ROUTES } from "../services/routes";
// import { auth } from "../services/firebase";

export default function Landing(props) {
  const goToLogin = () => {
    props.history.push(ROUTES.LOGIN);
  };

  const goToSignUp = () => {
    props.history.push(ROUTES.SIGN_UP);
  };

  return (
    <Center>
      <Box textAlign="center" display="block">
        <Heading
          fontWeight="bold"
          color="#47B881"
          size={900}
          marginBottom="1rem"
        >
          DD4C App
        </Heading>
        <Paragraph fontSize="1rem" marginBottom="1rem" color="muted">
          For CE Council Members ONLY
        </Paragraph>
        <Center>
          <Button
            appearance="primary"
            intent="success"
            marginRight="1rem"
            display="block"
            onClick={goToLogin}
          >
            Log In
          </Button>

          {/* <Button
            type="submit"
            textAlign="center"
            appearance="primary"
            intent="success"
            onClick={async () => {
              if (auth.currentUser) {
                await auth.signOut();
              console.log("Done")
              } else {
                console.log("No user")
              }
              
            }}
          >
            Sign Out
          </Button> */}

          <Button
            appearance="primary"
            intent="success"
            display="block"
            onClick={goToSignUp}
          >
            Sign Up
          </Button>
        </Center>
      </Box>
    </Center>
  );
}
