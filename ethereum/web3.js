import Web3 from "web3";
// const dotenv = require("dotenv");

// dotenv.config();
let web3;
console.log(process.env.NEXT_PUBLIC_ENDPOINT);
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/d02963a7c73e430f8636d2074a498067"
  );
  web3 = new Web3(provider);
}

export default web3;
