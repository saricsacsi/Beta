const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const web3 = new Web3();
// FIXME Replace to your api key.
web3.setProvider(new web3.providers.HttpProvider("https://kovan.infura.io/NZj0uaZfw9wcy72qxjtS"));
console.log('... using HTTP Provider')

web3.eth.net.getId().then(console.log);
web3.eth.net.getNetworkType().then(console.log);
// given address of wallet now , later you can choose the wallet address
//****************************************************************** */
const address = '0x698144feB1efb9D9358013dEe13D11d5A12c50d6';
const abi = require('./abi_BW_v2.json');
const MyContract =  new web3.eth.Contract(abi, address);
// ******************************************************************

MyContract.methods.walletBalanceOfToken().call().then(console.log);

MyContract.methods.walletBalance().call().then(console.log);

