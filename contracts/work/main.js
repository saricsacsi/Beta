const { getPendingTransactions,
    transferToToken } = require('./beta2.js')

const address = '0x1353f2A2CA0c839189c351483B29Fc6785c402cd'
const abi = require('./abi_BW_v2.json')

getPendingTransactions(address, abi, function() {
    console.log('ok');
})