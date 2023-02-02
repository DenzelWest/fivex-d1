import axios from "axios";
import { ethers, utils } from "ethers";
import { contract } from "./contract.js";

export const deposit = async (amount, signer) => {
  try {
    const contractIns = new ethers.Contract(contract.polygon, contract.abi, signer);
    const deposit = await contractIns.functions.deposit({
      value: utils.parseEther(amount),
    });
    const receipt = await deposit.wait();
    if (receipt.status == true) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const claimAllRewards = async (signer) => {
  try {
    const contractIns = new ethers.Contract(contract.polygon, contract.abi, signer);
    const claimAll = await contractIns.functions.claimAllReward();
    const receipt = await claimAll.wait();
    if (receipt.status == true) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getStats = async (wallet, chain) => {
  try {
    chain = getChain(chain);
    const path = `${process.env.REACT_APP_BACKEND}/stake/getStats`;
    console.log(chain, wallet);
    return await axios
      .post(path, { wallet, chain })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (err) {
    console.log(err);
    return false;
  }
};

function getChain(id) {
  if (id == 80001) {
    return "mumbai";
  }
}
