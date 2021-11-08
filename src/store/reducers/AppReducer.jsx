import moment from "moment";
import * as actionTypes from "../actions/ActionTypes";

const mockup_data = [{
  partyId: '1234-5678',
  name: 'Monthly Beers',
  avatar: null,
  balance: 450.90,
  endDate: moment(new Date()).add(1000 * 60 * 60 * 24),
  status: 'Opened',
  isPublic: false,
}, {
  partyId: '1324-1142',
  name: 'Trip to Ibiza',
  avatar: null,
  balance: 650.90,
  endDate: moment(new Date()).add(1000 * 60 * 3),
  status: 'Opened',
  isPublic: false,
}, {
  partyId: '1234-5578',
  name: 'weekly Rand party',
  avatar: null,
  balance: 75691.54,
  endDate: moment(new Date()).add(1000 * 60 * 3),
  status: 'Opened',
  isPublic: true,
}, {
  partyId: '5619-3131',
  name: 'Family Party',
  avatar: null,
  balance: 780.90,
  endDate: moment(new Date()).add(1000 * 60 * 60 * 300),
  status: 'Opened',
  isPublic: false,
}];

const initialState = {
  headerTitle: '',
  isBlack: false,
  joinedParam: null,
  transferParam: null,
  partyList: mockup_data,
  balance: 1000,
  notificationData: null
};


const setHeaderTitle = (state, {headerTitle, ...rest}) => {
  return {
    ...state,
    ...{
      headerTitle: headerTitle,
    },
  };
};

const setJoinedParam = (state, {joinedParam, ...rest}) => {
  return {
    ...state,
    ...{
      joinedParam: joinedParam,
    },
  };
}

const setTransferParam = (state, {transferParam, ...rest}) => {
  return {
    ...state,
    ...{
      transferParam: transferParam,
    },
  };
}

const getParty = (_party, partyId) => {
  return _party.partyId == partyId;
}

const editParty = (state, {party, ...rest}) => {
  let index = state.partyList.findIndex((item) => getParty(item, party.partyId))
  let _partyList = JSON.parse(JSON.stringify(state.partyList))
  _partyList[index] = party
  return {
    ...state,
    ...{
      partyList: _partyList
    },
  };
}

const createParty = (state, {party, ...rest}) => {
  return {
    ...state,
    ...{
      partyList: [...state.partyList, party],
    },
  };
}

const setBlackTheme = (state, {isBlack, ...rest}) => {
  return {
    ...state,
    ...{
      isBlack: isBlack,
    },
  };
}

const setBalance = (state, {balance, ...rest}) => {
  return {
    ...state,
    ...{
      balance: balance,
    },
  };
}

const setNotificationData = (state, {notificationData, ...rest}) => {
  return {
    ...state,
    ...{
      notificationData: notificationData,
    },
  };
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HEADER_TITLE:
      return setHeaderTitle(state, action);
    case actionTypes.SET_JOINED_PARAM:
      return setJoinedParam(state, action);
    case actionTypes.SET_TRANSFER_PARAM:
      return setTransferParam(state, action);
    case actionTypes.EDIT_PARTY:
      return editParty(state, action);
    case actionTypes.CREATE_PARTY:
      return createParty(state, action);
    case actionTypes.SET_BLACK_THEME:
      return setBlackTheme(state, action);
    case actionTypes.SET_BALANCE:
      return setBalance(state, action);
    case actionTypes.SET_NOTIFICATION_DATA:
      return setNotificationData(state, action);
    default:
      return state;
  }
};

export default reducer;
