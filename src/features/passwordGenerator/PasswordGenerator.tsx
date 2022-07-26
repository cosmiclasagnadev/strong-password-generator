import {
  TextInput,
  Box,
  Button,
  Group,
  Overlay,
  createStyles,
} from "@mantine/core";
import { useState } from "react";
import { useModals } from "@mantine/modals";
import { passwordGenerator } from "./password-utils";
import { v4 as uuidv4 } from "uuid";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  rootBox: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: "center",
    padding: theme.spacing.xl,
    position: "relative",
    borderRadius: theme.radius.md,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    cursor: "pointer",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
}));

const PasswordGenerator = ({
  password,
  setPassword,
  setPasswordList,
  passwordList,
}: any) => {
  const [length, setLength] = useState("");
  const [copyOverlay, setCopyOverlay] = useState(false);
  const { classes } = useStyles();
  const modals = useModals();

  const handleGenerate = (length: any) => {
    try {
      setPassword(passwordGenerator(length));
      showNotification({
        title: "Success!",
        message:
          "Password Generated! Click the box to copy now or add it to your personal list!",
        color: "blue",
        autoClose: 5000,
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleAddItem = (name?: string) => {
    setPasswordList([
      {
        name,
        id: uuidv4(),
        value: password,
        timestamp: new Date().toLocaleString(),
      },
      ...passwordList,
    ]);
    setPassword("");
    syncToLocalStorage({
      name,
      id: uuidv4(),
      value: password,
      timestamp: new Date().toLocaleString(),
    });
    showNotification({
      title: "Success!",
      message: "Password added to your personal list!",
      color: "green",
      autoClose: 5000,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyOverlay(true);
    setTimeout(() => {
      setCopyOverlay(false);
    }, 1000);
  };

  const syncToLocalStorage = (newPasswordObject: any) => {
    const store = localStorage.getItem("store");
    if (store) {
      const storeObj = JSON.parse(store);
      if (storeObj.passwords !== passwordList) {
        localStorage.setItem(
          "store",
          JSON.stringify({
            ...storeObj,
            passwords: [newPasswordObject, ...storeObj.passwords],
          })
        );
      }
    }

    console.log("Synced");
  };

  const openAddItemModal = () => {
    let name = ""; // I don't currently know if this is the best way to handle this functionality but it works so far
    modals.openConfirmModal({
      title: "Add a name for your password.",
      children: (
        <TextInput
          type="text"
          data-autofocus
          onChange={(e) => {
            name = e.target.value;
          }}
          placeholder="Name"
          label="Name"
        />
      ),
      labels: { confirm: "Add", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handleAddItem(name);
        name = "";
      },
    });
  };

  return (
    <div>
      <Box
        my="lg"
        className={classes.rootBox}
        onClick={() => {
          handleCopy();
        }}
      >
        {copyOverlay && <Overlay opacity={0.6} color="#000" zIndex={5} />}
        {copyOverlay ? "✅ Copied!" : password}
      </Box>
      <TextInput
        data-autofocus
        onChange={(e) => {
          setLength(e.currentTarget.value);
        }}
        my="lg"
        placeholder="Password Length:"
        size="lg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGenerate(length);
          }
        }}
      />
      <Group>
        <Button
          onClick={() => {
            handleGenerate(length);
          }}
          disabled={length === "" ? true : false}
        >
          Generate
        </Button>
        <Button
          disabled={password.length > 0 ? false : true}
          onClick={() => {
            openAddItemModal();
          }}
        >
          Add To List
        </Button>
      </Group>
    </div>
  );
};

export default PasswordGenerator;
