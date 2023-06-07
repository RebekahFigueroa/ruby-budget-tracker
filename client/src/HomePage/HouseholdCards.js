import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { HouseholdContext } from "../context/HouseholdContext";

const HouseholdCards = (household) => {
  const { setHousehold } = useContext(HouseholdContext);
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "25rem",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => setHousehold(household)}
    >
      <CardMedia
        sx={{ height: 200 }}
        image="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
        title={household.name}
        Household
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ rightMargin: "2rem" }}
          >
            {household.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HouseholdCards;
