import { TextInput, Text, Button } from "@mantine/core";
import React from "react";

const CreateForm = ({ hasStore, setHasStore }: any) => {
  const [name, setName] = React.useState("");

  const handleCreateStore = (name: string) => {
    // save store to local storage
    const newObject = {
      name,
      passwords: [],
    };
    localStorage.setItem("store", JSON.stringify(newObject));
    // set hasStore to true
    setHasStore(true);
  };
  return (
    <>
      <Text size="lg" mb="xs">
        Welcome to Strong Password Generator!
      </Text>
      <Text color="dimmed" size="md" mb="md">
        This tool will generate a strong password for you. We'll store it in
        your browser's localStorage securely so you won't need to entrust it to
        us.
      </Text>
      <TextInput
        value={name}
        mb="md"
        label="To Start, Enter a unique username below:"
        onChange={(e) => setName(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateStore(name);
          }
        }}
      />
      <Button variant="outline" onClick={() => handleCreateStore(name)}>
        Create My Password Store
      </Button>
    </>
  );
};

export default CreateForm;
