import { TextInput, Box, Button, Group, Overlay } from "@mantine/core";
import { useState } from "react";
import { passwordGenerator } from "./password-utils";
import { v4 as uuidv4 } from "uuid";

const PasswordGenerator = ({
  password,
  setPassword,
  setPasswordList,
  passwordList,
}: any) => {
  const [length, setLength] = useState("");
  const [copyOverlay, setCopyOverlay] = useState(false);

  const handleGenerate = (length: any) => {
    try {
      setPassword(passwordGenerator(length));
    } catch (error) {
      alert(error);
    }
  };

  const handleAddItem = () => {
    setPasswordList([
      {
        id: uuidv4(),
        value: password,
        timestamp: new Date().toLocaleString(),
      },
      ...passwordList,
    ]);
    setPassword("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyOverlay(true);
    setTimeout(() => {
      setCopyOverlay(false);
    }, 1000);
  };

  return (
    <div>
      <Box
        my="lg"
        sx={(theme) => ({
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
        })}
        onClick={() => {
          handleCopy();
        }}
      >
        {copyOverlay && <Overlay opacity={0.6} color="#000" zIndex={5} />}
        {copyOverlay ? "✅ Copied!" : password}
      </Box>
      <TextInput
        onChange={(e) => {
          setLength(e.currentTarget.value);
        }}
        my="lg"
        placeholder="Password Length:"
        size="lg"
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
            handleAddItem();
          }}
        >
          Add To List
        </Button>
      </Group>
    </div>
  );
};

export default PasswordGenerator;
