import {
  Container,
  createStyles,
  Paper,
  Stack,
  Transition,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
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
const CreateStore = ({ hasStore, setHasStore }: any) => {
  const { classes } = useStyles();
  const [transitionMounted, setTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTransition(true);
    }, 300);
  }, []);
  return (
    <Transition
      mounted={transitionMounted}
      transition="slide-up"
      duration={400}
      exitDuration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Container size="md">
            <Stack p="md" className={classes.root}>
              <Paper shadow="lg" p="md" className={classes.card}>
                <CreateForm hasStore={hasStore} setHasStore={setHasStore} />
              </Paper>
            </Stack>
          </Container>
        </div>
      )}
    </Transition>
  );
};

export default CreateStore;
