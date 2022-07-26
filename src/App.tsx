import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { theme } from "./theme";
import MainPage from "./pages/MainPage";
import { useEffect, useState } from "react";
import CreateStore from "./pages/CreateStore";

export default function App() {
  const [hasStore, setHasStore] = useState(false);

  useEffect(() => {
    const store = localStorage.getItem("store");
    if (store) {
      setHasStore(true);
    }
  }, [hasStore]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider autoClose={4000}>
          {hasStore ? <MainPage /> : <CreateStore />}
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
