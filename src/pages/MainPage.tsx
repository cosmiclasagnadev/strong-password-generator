import { Paper, Stack, createStyles } from "@mantine/core";
import { useState } from "react";
import PasswordGenerator from "../features/passwordGenerator/PasswordGenerator";
import PasswordLister from "../features/passwordGenerator/PasswordLister";

const useStyles = createStyles((theme) => ({
  root: {
    width: "650px",
    height: "100vh",
    justifyContent: "center",
    maxWidth: theme.breakpoints.md,
    margin: "auto",
  },
  card: {
    padding: "lg",
    backgroundColor: theme.colors.dark[8],
    borderRadius: "5px",
  },
}));

const MainPage = () => {
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const { classes } = useStyles();
  return (
    <Stack p="md" className={classes.root}>
      <Paper shadow="lg" p="md" className={classes.card}>
        <PasswordGenerator
          password={password}
          setPassword={setPassword}
          setPasswordList={setPasswordList}
          passwordList={passwordList}
        />
      </Paper>
      {passwordList.length > 0 && (
        <PasswordLister
          passwordList={passwordList}
          setPasswordList={setPasswordList}
        />
      )}
    </Stack>
  );
};

export default MainPage;
