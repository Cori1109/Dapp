import axios from "axios";

export const getPublicParty = async () => {
  return axios
    .get(`https://rand-backend.azurewebsites.net/mvp/parties/public`)
    .then((response) => {
      //   const publicPartyRes = [
      //     {
      //       partyId: PARTY_ID,
      //       name: "Weekly Party",
      //       expectedPrize: 73000,
      //       participants: 20,
      //       endDate: TIMESTAMP_NEXT_DISTRIBUTION,
      //       prizeDistribution: {
      //         tier1: [2227, 2],
      //         tier2: [532, 26],
      //         tier3: [250, 2365],
      //       },
      //     },
      //   ];

      return response.data;
    })
    .catch((error) => {
      console.log(error);
      //   throw new Error(error.message);
    });
};

export const createPrivateParty = async (
  _name,
  _wallet,
  _maxDeposit,
  _participants,
  _duration
) => {
  return axios
    .post(`https://rand-backend.azurewebsites.net/mvp/parties/`, {
      name: _name,
      partyCreator: _wallet,
      maxDeposit: _maxDeposit,
      participants: _participants,
      duration: _duration,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      //   throw new Error(error.message);
    });
};

export const getUserDetails = (_wallet) => {
  return axios
    .get(
      `https://rand-backend.azurewebsites.net/mvp/users/details/${_wallet}`
    )
    .then((response) => {
      //   const userDetailsRes = {
      //     userDetails: { balance: AVAIALBE_BALANCE, staked: LOCKED_PARTIES },
      //     privateParties: [{ details_party1 }, { details_party2 }],
      //     publicParties: [{ joined_public_parties }],
      //   };

      return response.data;
    })
    .catch((error) => {
      console.log(error);
      //   throw new Error(error.message);
    });
};

export const getPrivatePartyDetails = (_partyId) => {
  return axios
    .get(
      `https://rand-backend.azurewebsites.net/mvp/parties/details/${_partyId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      //   throw new Error(error.message);
    });
};

export const changePartyAmount = async (_wallet, _amount, _partyId) => {
  return axios
    .post(`https://rand-backend.azurewebsites.net/mvp/parties/transaction`, {
      user: _wallet,
      amount: _amount,
      partyId: _partyId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
