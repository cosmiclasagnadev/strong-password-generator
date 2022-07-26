import { Container, createStyles, Paper, Stack } from "@mantine/core";
import React from "react";
import CreateForm from "../features/createStore/CreateForm";

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
const CreateStore = () => {
  const { classes } = useStyles();
  return (
    <Container size="md">
      <Stack p="md" className={classes.root}>
        <Paper shadow="lg" p="md" className={classes.card}>
          <CreateForm />
        </Paper>
      </Stack>
    </Container>
  );
};

export default CreateStore;
