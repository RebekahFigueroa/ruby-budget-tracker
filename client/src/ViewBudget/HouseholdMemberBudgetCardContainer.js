import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { HouseholdContext } from "../context/HouseholdContext";
import HouseholdMemberBudgetCard from "./HouseholdMemberBudgetCard";

const HouseholdMemberBudgetCardContainer = ({ budgetSum }) => {
  const { household } = useContext(HouseholdContext);
  const [houseMembers, setHouseMembers] = useState([]);
  const [totalIncome, setTotalIncome] = useState();

  useEffect(() => {
    const fetchMembers = () => {
      fetch(
        `http://localhost:9292/householdMembersByHouseholdId/${household.id}`
      )
        .then((response) => response.json())
        .then((houseMembers) => setHouseMembers(houseMembers));
    };
    fetchMembers();
  }, [household.id]);

  useEffect(() => {
    const fetchTotalIncome = () => {
      fetch(
        `http://localhost:9292/householdMembersTotalSalaryByHouseholdId/${household.id}`
      )
        .then((response) => response.json())
        .then((totalIncome) => setTotalIncome(totalIncome));
    };
    fetchTotalIncome();
  }, [household.id]);

  useEffect(() => {
    const fetchTotalIncome = () => {
      fetch(
        `http://localhost:9292/householdMembersTotalSalaryByHouseholdId/${household.id}`
      )
        .then((response) => response.json())
        .then((totalIncome) => setTotalIncome(totalIncome));
    };
    fetchTotalIncome();
  }, [household.id]);

  return (
    <>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {houseMembers.map((member) => (
          <HouseholdMemberBudgetCard
            key={member.id}
            member={member}
            budgetSum={budgetSum}
            totalIncome={totalIncome}
          />
        ))}
      </Box>
    </>
  );
};

export default HouseholdMemberBudgetCardContainer;
