import moment from "moment";
import * as actionTypes from "../actions/ActionTypes";

const mockup_data = [{
  _id: '1234-5678',
  name: 'Monthly Beers',
  avatar: null,
  amount: 450.90,
  maxDeposit: 500,
  endDate: moment(new Date()).add(1000 * 60 * 60 * 24),
  state: 'open',
  isPublic: false,
}, {
  _id: '1324-1142',
  name: 'Trip to Ibiza',
  avatar: null,
  amount: 650.90,
  endDate: moment(new Date()).add(1000 * 60 * 3),
  state: 'open',
  isPublic: false,
}, {
  _id: '1234-5578',
  name: 'Weekly Rand Party',
  avatar: null,
  amount: 70000.54,
  expectedPrize: 1500,
  prizeDistribution: {
    tier1: [500, 4],
    tier2: [500, 16],
    tier3: [500, 256],
  },
  endDate: moment(new Date()).add(1000 * 60 * 3),
  state: 'open',
  isPublic: true,
}, {
  _id: '5619-3131',
  name: 'Family Party',
  avatar: null,
  amount: 780.90,
  endDate: moment(new Date()).add(1000 * 60 * 60 * 300),
  state: 'open',
  isPublic: false,
}];

const initialState = {
  headerTitle: '',
  isBlack: false,
  joinedParam: {
    state: 'open'
  },
  transferParam: null,
  partyList: null,
  partyListDemo: mockup_data,
  publicParty: null,
  balance: 0,
  lockBalance: 0,
  notificationData: null,
  loading: false,
  loadingDeposit: false,
  isDemo: true,
};


const setPartyList = (state, {partyList, ...rest}) => {
  return {
    ...state,
    ...{
      partyList: partyList,
    },
  };
};

const setPublicParty = (state, {publicParty, ...rest}) => {
  return {
    ...state,
    ...{
      publicParty: publicParty,
    },
  };
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

const setLockBalance = (state, {lockBalance, ...rest}) => {
  return {
    ...state,
    ...{
      lockBalance: lockBalance,
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

const setLoading = (state, {loading, ...rest}) => {
  return {
    ...state,
    ...{
      loading: loading,
    },
  };
}

const setLoadingDeposit = (state, {loadingDeposit, ...rest}) => {
  return {
    ...state,
    ...{
      loadingDeposit: loadingDeposit,
    },
  };
}

const setIsDemo = (state, {isDemo, ...rest}) => {
  return {
    ...state,
    ...{
      isDemo: isDemo,
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
    case actionTypes.SET_PUBLIC_PARTY:
      return setPublicParty(state, action);
    case actionTypes.EDIT_PARTY:
      return editParty(state, action);
    case actionTypes.CREATE_PARTY:
      return createParty(state, action);
    case actionTypes.SET_BLACK_THEME:
      return setBlackTheme(state, action);
    case actionTypes.SET_BALANCE:
      return setBalance(state, action);
    case actionTypes.SET_LOCK_BALANCE:
      return setLockBalance(state, action);
    case actionTypes.SET_NOTIFICATION_DATA:
      return setNotificationData(state, action);
    case actionTypes.SET_LOADING:
      return setLoading(state, action);
    case actionTypes.SET_LOADING_DEPOSIT:
      return setLoadingDeposit(state, action);
    case actionTypes.SET_IS_DEMO:
      return setIsDemo(state, action);
    default:
      return state;
  }
};

export default reducer;
