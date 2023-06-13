import { Grid, List, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";
import EditHouseholdForm from "./EditHouseholdForm";
import HouseholdTable from "./HouseholdTable";

const ModifyHouseholdMainPage = () => {
  const { household } = useContext(HouseholdContext);
  const [householdMemberData, setHouseholdMemberData] = useState([]);
  const [householdMemberBeingEdited, setHouseholdMemberBeingEdited] =
    useState();

  useEffect(() => {
    const fetchHouseholds = async () => {
      fetch(
        `http://localhost:9292/householdMembersByHouseholdId/${household.id}`
      )
        .then((response) => response.json())
        .then((householdMembers) => setHouseholdMemberData(householdMembers));
    };

    fetchHouseholds();
  }, [household.id]);

  const onDeleteClick = (householdMemberId) => {
    fetch(`http://localhost:9292/household_members/${householdMemberId}`, {
      method: "DELETE",
    }).then(() => {
      setHouseholdMemberData((householdMembers) =>
        householdMembers.filter(
          (householdMember) => householdMember.id !== householdMemberId
        )
      );
    });
  };

  const onEditClick = (householdMemberId) => {
    setHouseholdMemberBeingEdited(
      householdMemberData.find(
        (householdMember) => householdMember.id === householdMemberId
      )
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
          Modify Household
        </Typography>
      </Grid>
      <Grid item xs={3}>
        {" "}
      </Grid>
      <Grid item xs={6}>
        <EditHouseholdForm
          setHouseholdMemberData={setHouseholdMemberData}
          setHouseholdMemberBeingEdited={setHouseholdMemberBeingEdited}
          householdMemberBeingEdited={householdMemberBeingEdited}
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
          {householdMemberData.map((householdMember) => (
            <HouseholdTable
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              key={householdMember.id}
              {...householdMember}
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

export default ModifyHouseholdMainPage;
