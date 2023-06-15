import { Grid, List, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";
import BudgetTable from "./BudgetTable";
import EditBudgetForm from "./EditBudgetForm";

const EditBudgetMainPage = () => {
  const { household } = useContext(HouseholdContext);
  const [budgetData, setBudgetData] = useState([]);
  const [budgetBeingEdited, setBudgetBeingEdited] = useState();

  useEffect(() => {
    const fetchBudgets = async () => {
      fetch(`http://localhost:9292/budgetsByHouseholdId/${household.id}`)
        .then((response) => response.json())
        .then((budgets) => setBudgetData(budgets));
    };
    fetchBudgets();
  }, [household.id]);

  const onDeleteClick = (budgetId) => {
    fetch(`http://localhost:9292/budgets/${budgetId}`, {
      method: "DELETE",
    }).then(() => {
      setBudgetData((budgets) =>
        budgets.filter((budget) => budget.id !== budgetId)
      );
    });
  };

  const onEditClick = (budgetId) => {
    setBudgetBeingEdited(budgetData.find((budget) => budget.id === budgetId));
  };

  return (
    <Grid container spacing={3} sx={{ minHeight: "100%" }}>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: "center",
            marginBottom: "0",
            marginTop: "2rem",
          }}
        >
          Modify Budget
        </Typography>
      </Grid>
      <Grid item xs={3}>
        {" "}
      </Grid>

      <Grid item xs={6}>
        <EditBudgetForm
          setBudgetData={setBudgetData}
          setBudgetBeingEdited={setBudgetBeingEdited}
          budgetBeingEdited={budgetBeingEdited}
        />
      </Grid>
      <Grid item xs={3}>
        {" "}
      </Grid>

      <Grid item xs={4}>
        {" "}
      </Grid>
      <Grid item xs={4}>
        <List>
          {budgetData.map((budget) => (
            <BudgetTable
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              key={budget.id}
              {...budget}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={4}>
        {" "}
      </Grid>
    </Grid>
  );
};

export default EditBudgetMainPage;
