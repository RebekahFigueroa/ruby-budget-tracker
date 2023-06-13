import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";

const EditHouseholdForm = ({
  setHouseholdMemberData,
  setHouseholdMemberBeingEdited,
  householdMemberBeingEdited,
}) => {
  const { household } = useContext(HouseholdContext);
  const [income, setIncome] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (householdMemberBeingEdited) {
      setIncome(householdMemberBeingEdited.income);
      setName(householdMemberBeingEdited.name);
    }
  }, [householdMemberBeingEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:9292/household_members${
        householdMemberBeingEdited ? `/${householdMemberBeingEdited.id}` : ""
      }`,
      {
        method: householdMemberBeingEdited ? "PATCH" : "POST",
        body: JSON.stringify({
          household_id: household.id,
          income: income,
          name: name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((householdMember) => {
        setHouseholdMemberBeingEdited(undefined);
        setHouseholdMemberData((householdMembers) => [
          householdMember,
          ...householdMembers.filter(
            (oldHouseholdMember) => householdMember.id !== oldHouseholdMember.id
          ),
        ]);
        setIncome("");
        setName("");
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
            label="Add family member"
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
            label="Add salary"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
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

export default EditHouseholdForm;
