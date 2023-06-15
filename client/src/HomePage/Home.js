import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HouseholdCards from "./HouseholdCards";

const Home = () => {
  const [householdData, setHouseholdData] = useState([]);

  useEffect(() => {
    const fetchHouseholds = () => {
      fetch("http://localhost:9292/households")
        .then((response) => response.json())
        .then((households) => setHouseholdData(households));
    };
    fetchHouseholds();
  }, []);

  return (
    <>
      <Box>
        <Typography
          gutterBottom
          variant="h1"
          component="div"
          sx={{
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "0",
          }}
        >
          Select A Household
        </Typography>
      </Box>

      <Box
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
          width: "80%",
          mb: 4,
          gap: 4,
        }}
      >
        {householdData.map((household) => (
          <HouseholdCards key={household.id} {...household} />
        ))}
      </Box>
    </>
  );
};

export default Home;
