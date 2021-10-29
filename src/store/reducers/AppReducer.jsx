import moment from "moment";
import * as actionTypes from "../actions/ActionTypes";

const mockup_data = [{
  partyId: '1234-5678',
  name: 'Monthly Beers',
  avatar: null,
  balance: '450,90',
  endDate: moment(new Date()).add(1000 * 60 * 60 * 24),
  status: 'opened',
}, {
  partyId: '1324-1142',
  name: 'Trip to Ibiza',
  avatar: null,
  balance: '650,90',
  endDate: moment(new Date()).add(1000 * 60 * 3),
  status: 'opened',
}, {
  partyId: '5619-3131',
  name: 'Family Party',
  avatar: null,
  balance: '780,90',
  endDate: moment(new Date()).add(1000 * 60 * 60 * 300),
  status: 'finished',
}];

const mockup_public_data = {
  partyId: '1234-5678',
  name: 'weekly Rand party',
  avatar: null,
  isPublic: false,
  balance: '75,691.54',
  endDate: moment(new Date()).add(1000 * 60 * 3),
  status: 'opened',
  participants: [{
    name: 'Phillip',
    avatar: null
  }, {
    name: 'Brandon',
    avatar: null
  }, {
    name: 'Julia',
    avatar: null
  }, {
    name: 'Dianne',
    avatar: null
  }, {
    name: 'Phillip',
    avatar: null
  }, {
    name: 'Brandon',
    avatar: null
  }, {
    name: 'Julia',
    avatar: null
  }, {
    name: 'Dianne',
    avatar: null
  }, {
    name: 'Phillip',
    avatar: null
  }, {
    name: 'Brandon',
    avatar: null
  }, {
    name: 'Julia',
    avatar: null
  }, {
    name: 'Dianne',
    avatar: null
  }],
  prizeResult: [{
    amount: 2273,
    count: 2
  }, {
    amount: 537,
    count: 26
  }, {
    amount: 250,
    count: 2356
  }]
}

const initialState = {
  headerTitle: '',
  isBlack: false,
  joinedParam: null,
  transferParam: null,
  partyList: mockup_data,
  publicParty: mockup_public_data,
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

const createParty = (state, {party, ...rest}) => {
  return {
    ...state,
    ...{
      partyList: [...state.partyList, party],
    },
  };
}

const setPublicParty = (state, {publicParty, ...rest}) => {
  return {
    ...state,
    ...{
      publicParty: publicParty
    }
  }
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
    case actionTypes.CREATE_PARTY:
      return createParty(state, action);
    case actionTypes.SET_PUBLIC_PARTY:
      return setPublicParty(state, action);
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
