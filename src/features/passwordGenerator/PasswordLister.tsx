import {
  Title,
  Text,
  ScrollArea,
  Card,
  ActionIcon,
  Group,
  Code,
  Tooltip,
} from "@mantine/core";
import {useState} from "react";
import {Backspace} from "tabler-icons-react";
import {showNotification} from "@mantine/notifications";
import secureLocalStorage from "react-secure-storage";

const PasswordLister = ({passwordList, setPasswordList}: any) => {
  const [copied, setCopiedState] = useState(false);

  const handleDelete = (id: any) => {
    const newPasswordList = passwordList.filter((item: any) => item.id !== id);
    setPasswordList(newPasswordList);
    syncToLocalStorage(newPasswordList);
    showNotification({
      title: "Success!",
      message: "Password deleted",
      color: "red",
      autoClose: 5000,
    });
  };

  const handleCopy = (value: any) => {
    navigator.clipboard.writeText(value);
    setCopiedState(true);
    setTimeout(() => {
      setCopiedState(false);
    }, 1000);
  };

  const syncToLocalStorage = (passwordList: any) => {
    const store: any = secureLocalStorage.getItem("store");
    if (store) {
      const storeObj = JSON.parse(store);
      if (storeObj.passwords !== passwordList) {
        secureLocalStorage.setItem(
          "store",
          JSON.stringify({
            ...storeObj,
            passwords: passwordList,
          })
        );
      }
    }
    console.log("Synced");
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
        <Card key={password.id} mb={15} shadow="sm" p="lg">
          <Group noWrap position="apart">
            <div>
              <Title mb={5} order={6}>
                {password.name !== ""
                  ? password.name
                  : "Password ID: " + password.id}
              </Title>
              <Tooltip
                label={copied ? "✅ Copied" : "📋 Copy to Clipboard"}
                position="top"
                placement="center"
                gutter={10}
              >
                <Code
                  sx={(theme) => ({
                    cursor: "pointer",
                    fontSize: "15px",
                  })}
                  onClick={() => handleCopy(password.value)}
                  mb="md"
                >
                  ******
                </Code>
              </Tooltip>
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
