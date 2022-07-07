import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { theme } from "./theme";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider autoClose={4000}>
          <MainPage />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
