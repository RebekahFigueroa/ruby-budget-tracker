import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { HouseholdContext } from "../context/HouseholdContext";
import HomeButton from "./HomeButton";
import NavItem from "./NavItem";

const NavBar = () => {
  const { household } = useContext(HouseholdContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <HomeButton />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {household ? household.name : "Select a household"}
        </Typography>
        {household && (
          <Stack direction="row" spacing={2}>
            <NavItem to="/view-budget" label="View Budget" />
            <NavItem to="/modify-budget" label="Modify Budget" />
            <NavItem to="/modify-household" label="Modify Household" />
            <NavItem to="/modify-budget-item" label="Modify Budget Item" />
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
