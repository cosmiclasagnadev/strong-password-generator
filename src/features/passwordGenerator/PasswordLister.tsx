import {
  Title,
  Text,
  ScrollArea,
  Card,
  ActionIcon,
  Group,
  Code,
} from "@mantine/core";
import { Backspace } from "tabler-icons-react";
import React from "react";

const PasswordLister = ({ passwordList, setPasswordList }: any) => {
  const handleDelete = (id: any) => {
    const newPasswordList = passwordList.filter((item: any) => item.id !== id);
    console.log(newPasswordList);
    setPasswordList(newPasswordList);
  };

  return (
    <ScrollArea
      style={{
        height: "380px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {passwordList.map((password: any, index: any) => (
        <Card mb={15} shadow="sm" p="lg">
          <Group noWrap position="apart">
            <div>
              <Title mb={5} order={6}>
                Password ID: {password.id}
              </Title>
              <Code mb="md">{password.value}</Code>
              <Text size="xs" color="dimmed">
                {password.timestamp}
              </Text>
            </div>
            <div>
              <ActionIcon
                size="lg"
                variant="filled"
                onClick={() => {
                  handleDelete(password.id);
                }}
              >
                <Backspace size={20} strokeWidth={1} />
              </ActionIcon>
            </div>
          </Group>
        </Card>
      ))}
    </ScrollArea>
  );
};

export default PasswordLister;
