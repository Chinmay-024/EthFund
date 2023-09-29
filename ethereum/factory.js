import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
// const dotenv = require("dotenv");

// dotenv.config();
console.log(process.env.NEXT_PUBLIC_ADDRESS);
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.NEXT_PUBLIC_ADDRESS
);

export default instance;
