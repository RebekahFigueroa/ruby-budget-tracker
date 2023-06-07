import { createContext, useState } from "react";

export const HouseholdContext = createContext({});

const HouseholdContextProvider = ({ children }) => {
  const [household, setHousehold] = useState();

  return (
    <HouseholdContext.Provider
      value={{
        household,
        setHousehold,
      }}
    >
      {children}
    </HouseholdContext.Provider>
  );
};

export default HouseholdContextProvider;
