import Router from "./routes";
import { StyledEngineProvider } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
