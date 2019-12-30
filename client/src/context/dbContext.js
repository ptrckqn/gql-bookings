import React, { createContext, useState, useEffect } from "react";

export const DbContext = createContext();

export const DbContextProvider = ({ children }) => {
  const [db, setDb] = useState(localStorage.getItem("DB_URL"));

  useEffect(() => {
    localStorage.setItem("DB_URL", db);
  }, [db]);
  return (
    <DbContext.Provider value={[db, setDb]}>{children}</DbContext.Provider>
  );
};
