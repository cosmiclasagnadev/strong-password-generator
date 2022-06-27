import { useState } from "react";
import { Center, MantineProvider, Paper, Stack, Title } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import PasswordGenerator from "./features/passwordGenerator/PasswordGenerator";
import PasswordLister from "./features/passwordGenerator/PasswordLister";
import { theme } from "./theme";

export default function App() {
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider autoClose={4000}>
        <Stack
          p="md"
          sx={(theme) => ({
            width: "650px",
            maxWidth: theme.breakpoints.md,
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
                backgroundColor: theme.colors.dark[8],
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
      </NotificationsProvider>
    </MantineProvider>
  );
}
