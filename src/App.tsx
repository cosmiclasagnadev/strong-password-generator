import { useState } from "react";
import {
  Center,
  Container,
  MantineProvider,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import PasswordGenerator from "./features/passwordGenerator/PasswordGenerator";
import PasswordLister from "./features/passwordGenerator/PasswordLister";
import { theme } from "./theme";

export default function App() {
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack
        sx={(theme) => ({
          width: "650px",
          maxWidth: theme.breakpoints.lg,
          margin: "auto",
        })}
      >
        <Title>
          <Center my="lg">Beautiful Password Generator</Center>
        </Title>
        <Paper
          shadow="lg"
          p="md"
          sx={(theme) => {
            return {
              padding: "lg",
              backgroundColor: "#3c3c3c",
              borderRadius: "5px",
            };
          }}
        >
          <PasswordGenerator
            password={password}
            setPassword={setPassword}
            setPasswordList={setPasswordList}
            passwordList={passwordList}
          />
        </Paper>
        <PasswordLister
          passwordList={passwordList}
          setPasswordList={setPasswordList}
        />
      </Stack>
    </MantineProvider>
  );
}
