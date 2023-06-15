import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const BudgetItemsTable = ({
  household_member_id,
  budget_id,
  id,
  amount,
  expense_type,
  purchase_date,
  notes,
  onDeleteClick,
  onEditClick,
  household,
}) => {
  const [budgetName, setBudgetName] = useState();
  const [householdMemberName, setHouseholdMemberName] = useState();

  const fetchBudgetName = () => {
    fetch(`http://localhost:9292/budgets/${budget_id}`)
      .then((response) => response.json())
      .then((budget) => setBudgetName(budget.name));
  };

  const fetchHouseholdMemberName = () => {
    fetch(`http://localhost:9292/household_members/${household_member_id}`)
      .then((response) => response.json())
      .then((householdMember) => setHouseholdMemberName(householdMember.name));
  };

  useEffect(() => {
    fetchBudgetName();
    fetchHouseholdMemberName();
  });

  return (
    <Card
      sx={{
        width: "16rem",
        height: "17rem",
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ rightMargin: "2rem" }}
          >
            {`$${parseFloat(amount).toFixed(2)}`}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {householdMemberName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {expense_type} purchase: {budgetName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Purchase date: {new Date(purchase_date).toLocaleDateString()}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ rightMargin: "2rem" }}
        >
          Notes:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {notes}
        </Typography>
        <CardActions sx={{}}>
          <IconButton onClick={() => onEditClick(id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDeleteClick(id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default BudgetItemsTable;
