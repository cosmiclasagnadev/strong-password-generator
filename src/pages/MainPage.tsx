import {
  Paper,
  Stack,
  createStyles,
  Title,
  Container,
  Affix,
  Button,
  Text,
  Loader,
  Transition,
} from "@mantine/core";
import {useEffect, useState} from "react";
import PasswordGenerator from "../features/passwordGenerator/PasswordGenerator";
import {openConfirmModal} from "@mantine/modals";
import PasswordLister from "../features/passwordGenerator/PasswordLister";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100vh",
    justifyContent: "center",
    margin: "auto",
  },
  card: {
    padding: "lg",
    backgroundColor: theme.colors.dark[8],
    borderRadius: "5px",
  },
  loader: {
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: theme.breakpoints.md,
    margin: "auto",
  },
}));

const MainPage = ({hasStore, setHasStore}: any) => {
  const [transitionMounted, setTransition] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const {classes} = useStyles();

  useEffect(() => {
    const store = localStorage.getItem("store");
    if (store) {
      const storeObj = JSON.parse(store);
      setUsername(storeObj.name);
      setPasswordList(storeObj.passwords);
    }

    // set setLoading to false after 1000ms to prevent flashing
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    setTimeout(() => {
      setTransition(true);
    }, 3300);
  }, []);

  const openResetModal = () =>
    openConfirmModal({
      title: "Are you sure you want to delete all of your data?",
      children: (
        <Text>This will delete all of your passwords and username.</Text>
      ),
      labels: {confirm: "Confirm", cancel: "Cancel"},
      onConfirm: () => {
        resetAll();
      },
      onCancel: () => {
        console.log("Cancelled");
      },
    });

  function resetAll() {
    setUsername("");
    setPassword("");
    setPasswordList([]);
    setHasStore(false);
    localStorage.removeItem("store");
  }

  if (loading)
    return (
      <Container size="md">
        <Stack p="md" className={classes.loader}>
          <Loader className={classes.loader} color="cyan" />
        </Stack>
      </Container>
    );
  return (
    <Transition
      mounted={transitionMounted}
      transition="slide-up"
      duration={400}
      exitDuration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Container style={styles} size="sm">
          <Stack p="md" className={classes.root}>
            <Title align="center" order={1}>
              Greetings, {username}!
            </Title>
            <Paper shadow="lg" p="md" className={classes.card}>
              <Affix position={{right: 20, bottom: 20}}>
                <Button onClick={openResetModal} color="red" variant="outline">
                  Reset All Data
                </Button>
              </Affix>
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
        </Container>
      )}
    </Transition>
  );
};

export default MainPage;
