

const address = '0xF2f09858E4784C94E5B92d72eC26c69ca0e5107E';
const abi = require('./abi_BW_v2.json');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/NZj0uaZfw9wcy72qxjtS"));



const calleraddress = '0x00b8192BAA2Ac87DEE21fD07F82FC4628550F953'
const privateKey = '0xf23bff1b4823044a6eff1eb9ac0aa1c144d18cc9c7334e7776d2b0de873d5ac2'
const beneficiary = '0x006EC6E3F6225eb6E802C65532ceD362A04D382a';
const amount = 1000;

const type = 0;

 

web3.eth.defaultAccount = '0x00b8192BAA2Ac87DEE21fD07F82FC4628550F953';

console.log(web3.eth.defaultAccount);
var version = web3.version;
console.log(version);


var resp
       
const BetaWalletContract =  new web3.eth.Contract(abi, address);
web3.eth.getTransactionCount(calleraddress).then( (nonce) => {
        let encodedABI = BetaWalletContract.methods.transferToToken(beneficiary, amount, type).encodeABI();
 BetaWalletContract.methods.transferToToken(beneficiary, amount, type).estimateGas({ 
    from: calleraddress }, (error, gasEstimate) => {
      let tx = {
        to: address,
        gas: gasEstimate,
        data: encodedABI,
        nonce: nonce
      };
      web3.eth.accounts.signTransaction(tx, privateKey, (err, resp) => {
        if (resp == null) {console.log("Error!");
        } 
        else {
          let tran = web3.eth.sendSignedTransaction(resp.rawTransaction);
          tran.on('transactionHash', (txhash) =>
           {
               console.log("Tx Hash: "+ txhash);
            });
        }
    })
})

})
 