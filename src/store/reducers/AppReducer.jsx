import * as actionTypes from "../actions/ActionTypes";

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

const setPartyList = (state, {partyList, ...rest}) => {
  return {
    ...state,
    ...{
      partyList: partyList,
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
    case actionTypes.SET_PARTY_LIST:
      return setPartyList(state, action);
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
