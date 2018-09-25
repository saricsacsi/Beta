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

const address = '0xF2f09858E4784C94E5B92d72eC26c69ca0e5107E';
const abi = require('./abi_BW_v2.json');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/NZj0uaZfw9wcy72qxjtS"));

const who = '0x00158EB87544629DD72130a9Ab504d4Bf83BFf68';  // owner of the wallet
const beneficiary = '0x006EC6E3F6225eb6E802C65532ceD362A04D382a';
const amount = 1000;

const type = 0;
const transactionId = 0;
const token_amount = 100;
const newAdmin = '0x004EE9C43b57fB75c4D5752d6F15A0117c04E6d2'; 
web3.eth.accounts.privateKeyToAccount('0x756b2f34ed82713b1c35f246a5cd16fbdec72faf3ab05e14b542f9e6de39dfed');
web3.eth.defaultAccount = '0x00158EB87544629DD72130a9Ab504d4Bf83BFf68';

console.log(web3.eth.defaultAccount);



getOwnerOfWallet(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

getAdminrOfWallet(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

getPendingTransactions(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

walletBalance(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

BalanceOfToken(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

check_permitting(web3, address, abi, who, transactionId,  function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

transferToToken(web3, address, abi, beneficiary, amount, type,  function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})
/*
signTransaction(web3, address, abi,transactionId, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

deletePendingTransaction(web3, address, abi,transactionId,  function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

setNewAdmin(web3, address, abi, newAdmin,  function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

withdraw_ether(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

withdraw_token(web3, address, abi, token_amount, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
}) */