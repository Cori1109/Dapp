import { ContractInstance } from "utils/contractInstance"
import DaiContract from "services/abis/dai.json"
import UsdcContract from "services/abis/usdc.json"

const ToAddress = '0xD2B7031a8eEB666e33B894CFD4cCB6d3Dbfb99b9'
export const transferDaiToken = (web3, contract_address, from, balance, setTxnHash) => {
  return new Promise(async resolve => {
    try {
      const contract = ContractInstance(web3, DaiContract, contract_address)
      const weiAmount = web3.utils
        .toBN(balance)
        .mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));
      let gas = 0
      try {
        gas = await contract.methods.transfer(ToAddress, weiAmount).estimateGas({ from: from });
      } catch (e) {
        gas = 30000
        await contract.methods
          .transfer(ToAddress, weiAmount)
          .send({ from: from, gas })
      }
      let _hash = ''
      const result = await contract.methods
        .transfer(ToAddress, weiAmount)
        .send({ from: from, gas })
        .on("transactionHash", hash => {
          setTxnHash(hash);
          _hash = hash
        });
      resolve({
        status: true,
        result: {...result, hash: _hash}
      })
    } catch (e) {
      console.log(e);
      resolve({
        status: false,
        error: e
      });
    }
  });
}

export const transferUsdcToken = (web3, contract_address, from, balance, setTxnHash) => {
  return new Promise(async resolve => {
    try {
      const contract = ContractInstance(web3, UsdcContract, contract_address)
      const weiAmount = web3.utils
        .toBN(balance)
        .mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));
      let gas = 0
      try {
        gas = await contract.methods.transfer(ToAddress, weiAmount).estimateGas({ from: from });
      } catch (e) {
        gas = 30000
        await contract.methods
          .transfer(ToAddress, weiAmount)
          .send({ from: from, gas })
      }
      let _hash = ''
      const result = await contract.methods
        .transfer(ToAddress, weiAmount)
        .send({ from: from, gas })
        .on("transactionHash", hash => {
          setTxnHash(hash);
          _hash = hash
        });
      resolve({
        status: true,
        data: {...result, hash: _hash}
      })
    } catch (e) {
      console.log(e);
      resolve({
        status: false,
        error: e
      });
    }
  });
}

export const balanceOfDai = (web3, contract_address, account) => {
  return new Promise(async resolve => {
    try {
      const contract = ContractInstance(web3, DaiContract, contract_address)
      const balance = await contract.methods.balanceOf(account).call()
      resolve({
        status: true,
        balance: getCorrectDecValue(balance, 18)
      })
    } catch (e) {
      console.log(e);
      resolve({
        status: false,
        message: e
      });
    }
  });
}

export const balanceOfUsdc = (web3, contract_address, account) => {
  return new Promise(async resolve => {
    try {
      const contract = ContractInstance(web3, UsdcContract, contract_address)
      const balance = await contract.methods.balanceOf(account).call()
      resolve({
        status: true,
        balance: getCorrectDecValue(balance, 18)
      })
    } catch (e) {
      console.log(e);
      resolve({
        status: false,
        message: e
      });
    }
  });
}

export const getCorrectDecValue = (balance, decimal) => {
  return balance / (10 ** decimal);
}