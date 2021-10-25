import * as actionTypes from "./ActionTypes";

export const setHeaderTitle = (payload) => ({
  type: actionTypes.SET_HEADER_TITLE,
  headerTitle: payload
});

export const setJoinedParam = (payload) => ({
  type: actionTypes.SET_JOINED_PARAM,
  joinedParam: payload
});

export const setPartyList = (payload) => ({
  type: actionTypes.SET_PARTY_LIST,
  partyList: payload
});

export const setBlackTheme = (payload) => ({
  type: actionTypes.SET_BLACK_THEME,
  isBlack: payload
});

export const setBalance = (payload) => ({
  type: actionTypes.SET_BALANCE,
  balance: payload
});