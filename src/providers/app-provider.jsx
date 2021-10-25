import React, {FC, useEffect, useState} from "react";
import {AppContext} from "./app-context";

const mockup_data = [{
  partyId: '1234-5678',
  name: 'Monthly Beers',
  avatar: null,
  balance: '450,90',
  leftHours: '12 Hours 30 Min',
  status: 'opened',
}, {
  partyId: '1324-1142',
  name: 'Trip to Ibiza',
  avatar: null,
  balance: '650,90',
  leftHours: '12 Hours 30 Min',
  status: 'opened',
}, {
  partyId: '5619-3131',
  name: 'Family Party',
  avatar: null,
  balance: '780,90',
  leftHours: '12 Hours 30 Min',
  status: 'finished',
}];

export const AppProvider = ({children}) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [isBlack, setIsBlack] = useState(false)
  const [joinedParam, setJoinedParam] = useState(null)
  const [partyList, setPartyList] = useState(mockup_data)
  const [balance, setBalance] = useState(1000)

  useEffect(() => {
  }, []);

  return (
    <AppContext.Provider
      value={{
        headerTitle,
        balance,
        isBlack,
        joinedParam,
        partyList,
        setHeaderTitle,
        setBalance,
        setIsBlack,
        setJoinedParam,
        setPartyList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
