import { Box, Button, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";

const BudgetItemsForm = ({
  setBudgetItemData,
  budgetItemBeingEdited,
  setBudgetItemBeingEdited,
}) => {
  const { household } = useContext(HouseholdContext);
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(dayjs("2023-05-12"));
  const [notes, setNotes] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState("");
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [selectedHouseholdMember, setSelectedHouseholdMember] = useState("");

  useEffect(() => {
    if (budgetItemBeingEdited) {
      console.log(budgetItemBeingEdited);
      setAmount(budgetItemBeingEdited.amount);
      setExpenseType(budgetItemBeingEdited.expense_type);
      setPurchaseDate(dayjs(budgetItemBeingEdited.purchase_date));
      setNotes(budgetItemBeingEdited.notes);
      setSelectedBudgetId(budgetItemBeingEdited.budget_id);
      setSelectedHouseholdMember(budgetItemBeingEdited.household_member_id);
    }
  }, [budgetItemBeingEdited]);

  useEffect(() => {
    const fetchBudgets = () => {
      fetch(`http://localhost:9292/budgetsByHouseholdId/${household.id}`)
        .then((response) => response.json())
        .then((budgets) => setBudgets(budgets));
    };
    fetchBudgets();
  }, [household.id]);

  useEffect(() => {
    const fetchHouseholdMembers = () => {
      fetch(
        `http://localhost:9292/householdMembersByHouseholdId/${household.id}`
      )
        .then((response) => response.json())
        .then((householdMembers) => setHouseholdMembers(householdMembers));
    };
    fetchHouseholdMembers();
  }, [household.id]);

  const handleSelectChangeBudget = (e) => {
    setSelectedBudgetId(e.target.value);
  };

  const handleSelectChangeExpenseType = (e) => {
    setExpenseType(e.target.value);
  };

  const handleSelectChangeHouseholdMember = (e) => {
    setSelectedHouseholdMember(e.target.value);
  };

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
          household_member_id: selectedHouseholdMember,
          budget_id: selectedBudgetId,
          expense_type: expenseType,
          amount: amount,
          purchase_date: purchaseDate,
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
        setPurchaseDate("");
        setNotes("");
        setSelectedBudgetId("");
        setSelectedHouseholdMember("");
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
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expense Date"
              value={purchaseDate}
              onChange={(newPurchaseDate) => setPurchaseDate(newPurchaseDate)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={4.5}>
          <FormControl sx={{ m: 1, width: "95%" }}>
            <InputLabel id="simple-select-label">
              Select Household Member
            </InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedHouseholdMember}
              label="Select Household Member"
              onChange={handleSelectChangeHouseholdMember}
            >
              {householdMembers.map((householdMember) => (
                <MenuItem key={householdMember.id} value={householdMember.id}>
                  {householdMember.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4.5}>
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
            placeholder="ex. -2356"
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl sx={{ m: 1, width: "95%" }}>
            <InputLabel id="simple-select-label">Select Budget</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedBudgetId}
              label="Select Budget"
              onChange={handleSelectChangeBudget}
            >
              {budgets.map((budget) => (
                <MenuItem key={budget.id} value={budget.id}>
                  {budget.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="simple-select-label">
              Select Expense Type
            </InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={expenseType}
              label="Select Expense Type"
              onChange={handleSelectChangeExpenseType}
            >
              <MenuItem value={"household"}>household</MenuItem>
              <MenuItem value={"personal"}>personal</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-required"
            label="Add notes about budget item"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Please keep <200 characters"
            color="secondary"
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
