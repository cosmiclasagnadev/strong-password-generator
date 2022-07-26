import { TextInput, Title, Text, Button } from "@mantine/core";
import React from "react";

const CreateForm = () => {
  const [name, setName] = React.useState("");
  function handleCreateStore(name: string) {
    // save store to local storage
    localStorage.setItem(
      "store",
      JSON.stringify({
        name,
        passwords: [],
      })
    );
  }
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
      />
      <Button variant="outline" onClick={() => handleCreateStore(name)}>
        Create my Password Store
      </Button>
    </>
  );
};

export default CreateForm;
