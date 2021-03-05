import React from "react";
import Center from "../components/Center";
import { Link as RouterLink } from "react-router-dom";
import {
  Heading,
  TextInputField,
  Button,
  toaster,
  Link,
  Paragraph,
} from "evergreen-ui";
import { signUp } from "../services/auth";
import Box from "ui-box";
import { ROUTES } from "../services/routes";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toaster.danger(e.message);
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
          Sign Up
        </Heading>
        <Paragraph textAlign="center" marginBottom color="muted">
          ONLY CE Council
        </Paragraph>
        <TextInputField
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fontSize="16px"
          label="Email"
          placeholder="Email"
        />
        <TextInputField
          name="password"
          required
          label="Password"
          type="password"
          value={password}
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
            Sign Up
          </Button>

          <Box marginTop="1rem">
            <Link
              is={RouterLink}
              color="green"
              to={ROUTES.LOGIN}
              textAlign="center"
            >
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
