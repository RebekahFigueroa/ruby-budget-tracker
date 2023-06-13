import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import React from "react";

const BudgetItemsTable = ({
  household_member_id,
  budget_id,
  id,
  amount,
  expenseType,
  purchaseType,
  purchaseDate,
  notes,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <ListItem>
      <IconButton onClick={() => onEditClick(id)}>
        <EditIcon />
      </IconButton>
      <ListItemText
        primary={expenseType}
        secondary={`$${parseFloat(amount).toFixed(2)}`}
      />
      <IconButton onClick={() => onDeleteClick(id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default BudgetItemsTable;
