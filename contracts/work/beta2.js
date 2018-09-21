
const Web3 = require('web3');
const web3 = new Web3();


// CALL
/*
_owner
admin
beneficiary.....
*/

function getAdminrOfWallet(address, abi) {
    var res
    var Contract = web3.eth.contract(abi);
        // initiate contract for an address
    var BetaWalletContract = Contract.at(address);
          
        BetaWalletContract.admin(function(error, res) {

          });
          
        }

function getOwnerOfWallet(address, abi) {
    var res
    var Contract = web3.eth.contract(abi);
        // initiate contract for an address
    var BetaWalletContract = Contract.at(address);
          
        BetaWalletContract._owner(function(error, res) {

          });
          
        }



/*

getPendingTransactions()
walletBalance()
walletBalanceOfToken()
*/
function getPendingTransactions(address, abi, callback) {
    var res
    var BetaWalletContract =  new web3.eth.Contract(abi, address);
        // initiate contract for an address
    //var WalletContracBetat = Contract.at(address);
            try {
                BetaWalletContract.getPendingTransactions(function(error, res) {
                    if (!error) {
                        callback(res);   
                    }
                      });
            } catch (err) {
                callback(err);
            }
        }


function walletBalance(address, abi) {
    var res,balance
    var Contract = web3.eth.contract(abi);
        // initiate contract for an address
    var BetaWalletContract = Contract.at(address);
            try {
                BetaWalletContract.walletBalance(function(error, res) {
                    if (!error) {
                        var balance = web3.fromWei(res, 'ether');
                    }
                });
            } catch (err) {
                
            }
        }


function BalanceOfToken(address, abi) {
    var res,balance
    var Contract = web3.eth.contract(abi);
        // initiate contract for an address
    var BetaWalletContract = Contract.at(address);
           try {
                BetaWalletContract.walletBalanceOfToken(function(error, res) {
                   if (!error) {                    
                   var balance = web3.fromWei(res, 'ether');
                
                    }
                });
            } catch (err) {
               
            }
        }

 


/*
// SEND

/*
setNewAdmin(address _newAdmin)
withdraw_ether()
withdraw_token(uint _amount)

transferToToken(address to, uint amount, uint32 typeofTransaction)
signTransaction(uint transactionId)
 deleteTransaction(uint transactionId)
 */ 
function transferToToken(address, abi, beneficiary, amount, type) {
    var res
    var Contract = web3.eth.contract(abi);
        // initiate contract for an address
    var BetaWalletContract = Contract.at(address);
    //web3.eth.defaultAccount = '0x0006bD3CEbF6ecD2A05018853bd4EB44187c267c';
    
    try {
        BetaWalletContract.transferToToken(beneficiary, amount, type,function(error, res) {
           if (!error) {                    
            
            }
        });
    } catch (err) {
        
    }
}

module.exports = {
    getPendingTransactions,
    transferToToken
  }