import React from "react";
import Center from "../components/Center";
import { Link as RouterLink } from "react-router-dom";
import { Heading, TextInputField, Button, toaster, Link, Paragraph } from "evergreen-ui";
import { logIn } from "../services/auth";
import Box from "ui-box";
import { ROUTES } from "../services/routes";
import * as Sentry from "@sentry/react";

export default function Login() { // restrict login???
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await logIn(email, password);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toaster.danger(e.message);
      Sentry.captureException(e);
    }
  };

  return (
    <Center>
      <Box is="form" onSubmit={onSubmit}>
        <Heading
          color="#47B881"
          textAlign="center"
          marginBottom="1rem"
          size={900}
        >
          Login
        </Heading>
        <Paragraph textAlign="center" marginBottom="1rem" color="muted">
          ONLY CE Council
        </Paragraph>
        <TextInputField
          name="email"
          required
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          fontSize="16px"
          label="Email"
          placeholder="Email"
        />
        <TextInputField
          name="password"
          required
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          fontSize="16px"
          placeholder="Password"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            textAlign="center"
            appearance="primary"
            intent="success"
            isLoading={isLoading}
          >
            Log In
          </Button>


          <Box marginTop="1rem">
            <Link
              is={RouterLink}
              color="green"
              to={ROUTES.SIGN_UP}
              textAlign="center"
            >
              Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
