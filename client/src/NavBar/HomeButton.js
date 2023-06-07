import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HouseholdContext } from "../context/HouseholdContext";

const HomeButton = () => {
  const { setHousehold } = useContext(HouseholdContext);
  return (
    <NavLink
      to="/home"
      style={(isActive) => ({
        textDecoration: "none",
        color: isActive ? "#90caf9" : "inherit",
      })}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        fontSize="inherit"
        aria-label="Home button"
        onClick={() => setHousehold(undefined)}
      >
        <HomeRoundedIcon />{" "}
      </IconButton>
    </NavLink>
  );
};

export default HomeButton;
