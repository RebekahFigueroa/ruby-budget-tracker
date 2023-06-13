import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { HouseholdContext } from "../context/HouseholdContext";

const HouseholdCards = (household) => {
  const { setHousehold } = useContext(HouseholdContext);
  return (
    <Card
      sx={{
        width: "25rem",
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
          sx={{ rightMargin: "2rem", textAlign: "center" }}
        >
          {household.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HouseholdCards;
