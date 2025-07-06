import { createContext, useState } from "react";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [data, setData] = useState(null);
  return (
    <BusinessContext.Provider value={{ data, setData }}>
      {children}
    </BusinessContext.Provider>
  );
};
 