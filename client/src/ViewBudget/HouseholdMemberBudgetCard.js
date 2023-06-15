import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const HouseholdMemberBudgetCard = ({ budgetSum, totalIncome, member }) => {
  const [totalMemberExpense, setTotalMemberExpense] = useState();

  useEffect(() => {
    const fetchTotalMemberExpense = () => {
      fetch(
        `http://localhost:9292/budgetItemsTotalPaidToHouseholdPerMember/${member.id}`
      )
        .then((response) => response.json())
        .then((totalMemberExpense) =>
          setTotalMemberExpense(totalMemberExpense)
        );
    };
    fetchTotalMemberExpense();
  }, [member.id]);

  return (
    <Card
      sx={{
        width: "15rem",
        height: "10rem",
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {member.name}
          </Typography>
        </Box>

        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          color="text.secondary"
        >
          Salary: ${member.income}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Total Owed
            </Typography>
            <Typography
              color="primary.light"
              sx={{
                textAlign: "center",
              }}
            >
              ${Math.round((member.income / totalIncome) * budgetSum)}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Paid
            </Typography>
            <Typography
              color="primary.light"
              sx={{
                textAlign: "center",
              }}
            >
              ${totalMemberExpense}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HouseholdMemberBudgetCard;
