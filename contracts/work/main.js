const {
    getOwnerOfWallet,
    getAdminrOfWallet,
    getPendingTransactions,
    walletBalance,
    BalanceOfToken,
    check_permitting,
    transferToToken,
    signTransaction,
    deletePendingTransaction,
    setNewAdmin,
    withdraw_ether,
    withdraw_token
  } = require('./beta2.js')

const address = '0x1353f2A2CA0c839189c351483B29Fc6785c402cd';
const abi = require('./abi_BW_v2.json');
const Web3 = require('web3');
const web3 = new Web3();

const who = '0x1353f2A2CA0c839189c351483B29Fc6785c402cd';
const beneficiary = '0x006EC6E3F6225eb6E802C65532ceD362A04D382a';

const amount = 1000;

const type = 0;
const transactionId = 1;
const token_amount = 100;
const newAdmin = '0x004EE9C43b57fB75c4D5752d6F15A0117c04E6d2';

getOwnerOfWallet(web3, address, abi, function(result , error) {
    console.log(result);
})

getAdminrOfWallet(web3, address, abi, function(result , error) {
    console.log(result);
})

getPendingTransactions(web3, address, abi, function(result , error) {
    console.log(result);
})

walletBalance(web3, address, abi, function(result , error) {
    console.log(result);
})

BalanceOfToken(web3, address, abi, function(result , error) {
    console.log(result);
})

check_permitting(web3, address, abi, who, transactionId,  function(result , error) {
    console.log(result);
})

transferToToken(web3, address, abi, beneficiary, amount, type,  function(result , error) {
    console.log(result);
})

signTransaction(web3, address, abi,transactionId, function(result , error) {
    console.log(result);
})

deletePendingTransaction(web3, address, abi,transactionId,  function(result , error) {
    console.log(result);
})

setNewAdmin(web3, address, abi, newAdmin,  function(result , error) {
    console.log(result);
})

withdraw_ether(web3, address, abi, function(result , error) {
    console.log(result);
})

withdraw_token(web3, address, abi, token_amount, function(result , error) {
    console.log(result);
})