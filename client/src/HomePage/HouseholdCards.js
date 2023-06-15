import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HouseholdContext } from "../context/HouseholdContext";
const StyledNavLink = styled(NavLink)({ textDecoration: "none" });

const HouseholdCards = (household) => {
  const { setHousehold } = useContext(HouseholdContext);

  return (
    <StyledNavLink to="/view-budget">
      <Card
        sx={{
          width: "15rem",
          height: "15rem",
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
        onClick={() => setHousehold(household)}
      >
        <CardMedia
          sx={{ height: 200 }}
          image="https://t4.ftcdn.net/jpg/01/23/68/71/360_F_123687102_3rPakqjpruQ7hV0yImMYcSYBXGkTCwE5.jpg"
          title={household.name}
          Household
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ rightMargin: "1rem", textAlign: "center" }}
          >
            {household.name}
          </Typography>
        </CardContent>
      </Card>
    </StyledNavLink>
  );
};

export default HouseholdCards;
