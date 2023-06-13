import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";

const BudgetItemsForm = ({
  setBudgetItemData,
  budgetItemBeingEdited,
  setBudgetItemBeingEdited,
}) => {
  const { household } = useContext(HouseholdContext);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (budgetItemBeingEdited) {
      setAmount(budgetItemBeingEdited.amount);
      setExpenseType(budgetItemBeingEdited.expenseType);
      setPurchaseType(budgetItemBeingEdited.purchaseType);
      setPurchaseDate(budgetItemBeingEdited.purchaseDate);
      setNotes(budgetItemBeingEdited.notes);
    }
  }, [budgetItemBeingEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:9292/budget_events${
        budgetItemBeingEdited ? `/${budgetItemBeingEdited.id}` : ""
      }`,
      {
        method: budgetItemBeingEdited ? "PATCH" : "POST",
        body: JSON.stringify({
          household_id: household.id,
          amount: amount,
          expenseType: expenseType,
          purchaseType: purchaseType,
          purchaseDate: purchaseDate,
          notes: notes,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((budgetItem) => {
        setBudgetItemBeingEdited(undefined);
        setBudgetItemData((budgetItems) => [
          budgetItem,
          ...budgetItems.filter(
            (oldBudgetItem) => budgetItem.id !== oldBudgetItem.id
          ),
        ]);
        setAmount("");
        setExpenseType("");
        setPurchaseType("");
        setPurchaseDate("");
        setNotes("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-required"
            label="Add name of your budget item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Please keep <100 characters"
            color="secondary"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-number"
            label="Add total monthly budget for this item"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Please use a positive number"
          />
        </Grid>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ marginTop: "1rem", marginLeft: "7px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
};

export default BudgetItemsForm;
