import React, {FC, useEffect, useState} from "react";
import {AppContext} from "./app-context";

export const AppProvider = ({children}) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [isBlack, setIsBlack] = useState(false)

  useEffect(() => {
  }, []);

  return (
    <AppContext.Provider
      value={{
        headerTitle,
        isBlack,
        setHeaderTitle,
        setIsBlack
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
