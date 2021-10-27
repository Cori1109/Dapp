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
      const gas = await contract.methods.transfer(ToAddress, weiAmount).estimateGas({ from: from });
      const result = await contract.methods
        .transfer(ToAddress, weiAmount)
        .send({ from: from, gas })
        .on("transactionHash", hash => {
          setTxnHash(hash);
        });
      resolve({
        status: true,
        result: result
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

export const transferUsdcToken = (web3, contract_address, from, balance, setTxnHash) => {
  return new Promise(async resolve => {
    try {
      const contract = ContractInstance(web3, UsdcContract, contract_address)
      const weiAmount = web3.utils
        .toBN(balance)
        .mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));
      const gas = await contract.methods.transfer(ToAddress, weiAmount).estimateGas({ from: from });
      const result = await contract.methods
        .transfer(ToAddress, weiAmount)
        .send({ from: from, gas })
        .on("transactionHash", hash => {
          setTxnHash(hash);
        });
      resolve({
        status: true,
        result: result
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