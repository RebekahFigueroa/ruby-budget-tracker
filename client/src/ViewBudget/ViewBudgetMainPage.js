import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";
import HouseholdMemberBudgetCardContainer from "./HouseholdMemberBudgetCardContainer";

const ViewBudgetMainPage = () => {
  const { household } = useContext(HouseholdContext);
  const [budgetSum, setBudgetSum] = useState();
  const [budgetPaid, setBudgetPaid] = useState();

  useEffect(() => {
    const fetchBudgetSum = () => {
      fetch(`http://localhost:9292/budgetsSumByHouseholdId/${household.id}`)
        .then((response) => response.json())
        .then((budgetSum) => setBudgetSum(budgetSum));
    };
    fetchBudgetSum();
  }, [household.id]);

  useEffect(() => {
    const fetchBudgetPaid = () => {
      fetch(
        `http://localhost:9292/budgetItemsTotalPaidToHousehold/${household.id}`
      )
        .then((response) => response.json())
        .then((budgetPaid) => setBudgetPaid(budgetPaid));
    };
    fetchBudgetPaid();
  }, [household.id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ marginRight: "2rem", padding: "2rem" }}>
          <Typography
            color="primary"
            variant="h5"
            sx={{
              textAlign: "center",
            }}
          >
            Total Monthly Budget
          </Typography>
          <Typography
            variant="h5"
            color="primary.light"
            sx={{
              textAlign: "center",
            }}
          >
            ${budgetSum}
          </Typography>
        </Box>
        <Box sx={{ marginRight: "2rem", padding: "2rem" }}>
          <Typography
            color="primary"
            variant="h5"
            sx={{
              textAlign: "center",
            }}
          >
            Monthly Budget Paid
          </Typography>
          <Typography
            variant="h5"
            color="primary.light"
            sx={{
              textAlign: "center",
            }}
          >
            ${budgetPaid}
          </Typography>
        </Box>
        <Box sx={{ marginRight: "2rem", padding: "2rem" }}>
          <Typography
            color="primary"
            variant="h5"
            sx={{
              textAlign: "center",
            }}
          >
            Monthly Budget Owed
          </Typography>
          <Typography
            variant="h5"
            color="primary.light"
            sx={{
              textAlign: "center",
            }}
          >
            ${budgetSum - budgetPaid}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <HouseholdMemberBudgetCardContainer
          budgetSum={budgetSum}
          household={household}
        />
      </Box>
    </Box>
  );
};

export default ViewBudgetMainPage;
