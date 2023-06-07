import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HouseholdCards from "./HouseholdCards";

const Home = () => {
  const [householdData, setHouseholdData] = useState([]);

  useEffect(() => {
    const fetchHouseholds = async () => {
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-evenly",
            mb: 4,
          }}
        >
          {householdData.map((household) => (
            <HouseholdCards key={household.id} {...household} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
