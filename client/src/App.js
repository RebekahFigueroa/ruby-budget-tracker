import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomePage/Home";
import NavBar from "./NavBar/NavBar";
import HouseholdContextProvider from "./context/HouseholdContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <HouseholdContextProvider>
          <NavBar />
          <Box sx={{ height: "calc(100vh - 3rem)" }}>
            <Routes>
              <Route path="/home" Component={Home} />
            </Routes>
          </Box>
        </HouseholdContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
