import { Grid, List, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";
import BudgetItemsForm from "./BudgetItemsForm";
import BudgetItemsTable from "./BudgetItemsTable";

const BudgetItemsMainPage = () => {
  const { household } = useContext(HouseholdContext);
  const [budgetItemData, setBudgetItemData] = useState([]);
  const [budgetItemBeingEdited, setBudgetItemBeingEdited] = useState();

  useEffect(() => {
    const fetchBudgetItems = async () => {
      fetch(`http://localhost:9292/budgetItemsByHouseholdId/${household.id}`)
        .then((response) => response.json())
        .then((budgetItems) => setBudgetItemData(budgetItems));
    };
    fetchBudgetItems();
  }, [household.id]);

  const onDeleteClick = (budgetItemId) => {
    fetch(`http://localhost:9292/budget_events/${budgetItemId}`, {
      method: "DELETE",
    }).then(() => {
      setBudgetItemData((budgetItems) =>
        budgetItems.filter((budgetItem) => budgetItem.id !== budgetItemId)
      );
    });
  };

  const onEditClick = (budgetItemId) => {
    setBudgetItemBeingEdited(
      budgetItemData.find((budgetItem) => budgetItem.id === budgetItemId)
    );
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
          Modify Budget Items
        </Typography>
      </Grid>
      <Grid item xs={3}>
        {" "}
      </Grid>
      <Grid item xs={6}>
        <BudgetItemsForm
          setBudgetItemData={setBudgetItemData}
          setBudgetItemBeingEdited={setBudgetItemBeingEdited}
          budgetItemBeingEdited={budgetItemBeingEdited}
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
          {budgetItemData.map((budgetItem) => (
            <BudgetItemsTable
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              key={budgetItem.id}
              {...budgetItem}
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

export default BudgetItemsMainPage;
