import {MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import {theme} from "./theme";
import MainPage from "./pages/MainPage";
import {useEffect, useState} from "react";
import CreateStore from "./pages/CreateStore";
import secureLocalStorage from "react-secure-storage";

export default function App() {
  const [hasStore, setHasStore] = useState(false);

  useEffect(() => {
    const store = secureLocalStorage.getItem("store");
    if (store) {
      setHasStore(true);
    }
  }, [hasStore, setHasStore]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider autoClose={4000}>
          {hasStore ? (
            <MainPage hasStore={hasStore} setHasStore={setHasStore} />
          ) : (
            <CreateStore hasStore={hasStore} setHasStore={setHasStore} />
          )}
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
