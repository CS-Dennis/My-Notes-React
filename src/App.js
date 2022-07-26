import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

const theme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: '#42c3be',
        contrastText: 'rgba(255,255,255,0.87)',
      },
      secondary: {
        main: '#c34246',
      },
      text: {
        primary: 'rgba(0,0,0,0.87)',
      },
    },
  }
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
