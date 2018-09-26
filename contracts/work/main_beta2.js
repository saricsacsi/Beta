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
const calleraddress = '0x00b8192BAA2Ac87DEE21fD07F82FC4628550F953'
const privateKey = '0xf23bff1b4823044a6eff1eb9ac0aa1c144d18cc9c7334e7776d2b0de873d5ac2'
const sign_address = '0x00aea2F64262d114D7cFaF65adC81856D2be6Be6'
const sign_privateKey = '0xbe1a78f11e94103a7e0c13c7bffafea063be5738021f9f04a558863e382d9d13'
const who = '0x00aea2F64262d114D7cFaF65adC81856D2be6Be6';  // owner of the wallet
const beneficiary = '0x006EC6E3F6225eb6E802C65532ceD362A04D382a';
const amount = 1000;

const type = 0;
const transactionId = 7;
const del_transactionId = 15;
const token_amount = 100;
const newAdmin = '0x00b8192BAA2Ac87DEE21fD07F82FC4628550F953'; 
web3.eth.accounts.privateKeyToAccount('0x756b2f34ed82713b1c35f246a5cd16fbdec72faf3ab05e14b542f9e6de39dfed');
web3.eth.defaultAccount = '0x00158EB87544629DD72130a9Ab504d4Bf83BFf68';

console.log(web3.eth.defaultAccount);
var version = web3.version;
console.log(version);



getOwnerOfWallet(web3, address, abi, function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("owner: "+ result);
      }
})

getAdminrOfWallet(web3, address, abi, function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("admin: "+ result);
      }
})

getPendingTransactions(web3, address, abi, function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("pedding tx: "+ result);
      }
})

walletBalance(web3, address, abi, function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("balance(eth): "+ result);
      }
})

BalanceOfToken(web3, address, abi, function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("balance(token): "+ result);
      }
})

check_permitting(web3, address, abi, who, transactionId, function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("can sign: "+ who +  "tx id: "+ transactionId + "result: "+ result);
      }
})
/*
transferToToken(web3, calleraddress, privateKey, address, abi, beneficiary, amount, type,  function(error , result) {
    if (error) {
      console.log("Error!");
      } else {
        console.log("TransferToToken Tx Hash: "+ result);
      }
})


signTransaction(web3, sign_address, sign_privateKey, address, abi, transactionId, function(error , result)  {
    if (error) {
      console.log("Error!");
    } else {
      console.log("Sign Tx Hash: "+ result);
    }
})

/*
deletePendingTransaction(web3, sign_address, sign_privateKey, address, abi, del_transactionId,  function(error , result) {
    if (error) {
      console.log("Error!");
      } else {
        console.log("del Tx Hash: "+ result)
      }
})
*/
setNewAdmin(web3, sign_address, sign_privateKey, address, abi, newAdmin,  function(error , result) {
    if (error) {
        console.log(error);
      } else {
        console.log("new Admin: "+ result)
      }
})
/*
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