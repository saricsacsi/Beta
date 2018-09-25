
const Web3 = require('web3');

/**
 * Calls a contract function.
 *
 * @method call
 * @param {...Object} Contract function arguments
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {String} the address of the owner
 */
function getOwnerOfWallet(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          
       
    try {
        BetaWalletContract.methods.owner().call((res, error) => {
            if (!error) {
                callback(res, 0);   
            }
            else {
                callback(null, error);
                }
            });
    } catch (err) {
        callback(0, err);
    }
}
/*
    @dev getting function for the admin of the Wallet
    @param web3 creating a web3 connection for the function whenever it is called
    @param address address of the contract that we are using
    @param abi abi of the contract that we are using
    @callback result the address of the admin in string

*/
function getAdminrOfWallet(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          
       
    try {
       BetaWalletContract.methods.admin().call((res, error) =>  {
            if (!error) {
                callback(res, 0);   
            }
            else {
                callback(null, error);
                }
            });
    } catch (err) {
        callback(0, err);
    }
}




/*
    @dev getter functions to get PendingTransactions
    @param web3 creating a web3 connection for the function whenever it is called
    @param address address of the contract that we are using
    @param abi abi of the contract that we are using
    @callback provide an array with the transaction id-s
 */

function getPendingTransactions(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
        // initiate contract for an address
    
            try {
                BetaWalletContract.methods.getPendingTransactions().call((res,error) => {
                    if (!error) {
                        callback(res, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }

/*
    @dev getter functions to get the balance of the ether that the wallet has got
    @param web3 creating a web3 connection for the function whenever it is called
    @param address address of the contract that we are using
    @param abi abi of the contract that we are using
    @callback provide an integer of the balance in ether
 */

function walletBalance(web3, address, abi, callback) {
    var res,balance
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.methods.walletBalance().call((res,error) => {
                    if (!error) {
                        var balance = web3.fromWei(res, 'ether');
                        callback(balance, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }

/*
    @dev getter functions to get the ballance of the tokens that the wallet holds
    @param web3 creating a web3 connection for the function whenever it is called
    @param address address of the contract that we are using
    @param abi abi of the contract that we are using
    @callback provide an integer of the balance
 */

function BalanceOfToken(web3, address, abi, callback) {
    var res,balance
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.methods.walletBalanceOfToken().call((res,error) => {
                    if (!error) {
                        var balance = web3.fromWei(res, 'ether');
                        callback(balance, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }
/*
    @dev getter functions to check if the address is permitted to sign the transaction with teh given id
    @param _who the address that we want to check
    @param _transactionId the transaction that we want to check by the id
    @param web3 creating a web3 connection for the function whenever it is called
    @param address address of the contract that we are using
    @param abi abi of the contract that we are using
    @callback provide an integer of the balance
 
check_permitting(address _who, uint _transactionId)
*/
        
function check_permitting(web3, address, abi, who, transactionId, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          // initiate contract for an address
    
            try {
                 BetaWalletContract.methods.check_permitting(who, transactionId).call((res,error) => {
                     if (!error) {
                         callback(res, 0);   
                      }
                    else {
                          callback(null, error);
                          }
                     });
            } catch (err) {
                callback(0, err);
            }
          }
        
/*
call the functions what are changing the state on the network:
setNewAdmin(address _newAdmin)
withdraw_ether()
withdraw_token(uint _amount)

transferToToken(address to, uint amount, uint32 typeofTransaction)
signTransaction(uint transactionId)
deleteTransaction(uint transactionId)
 */ 


 

function transferToToken(web3, address, abi, beneficiary, amount, type,  callback) {
    var res
       
    const BetaWalletContract =  new web3.eth.Contract(abi, address, {from: web3.eth.defaultAccount});    

            try {
                BetaWalletContract.methods.transferToToken(beneficiary, amount, type).send((res,error) => {
                    if (!error) {
                        callback(res, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }

      
        
function signTransaction(web3, address, abi,transactionId, callback) {
    var res
                       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
            try {
                BetaWalletContract.methods.signTransaction(transactionId).send((res,error) => {
                    if (!error) {
                         callback(res, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                     });
             } catch (err) {
                callback(0, err);
            }
        }  
                

        
function deletePendingTransaction(web3, address, abi,transactionId, callback) {
    var res
                                       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
                try {
                    BetaWalletContract.methods.deletePendingTransaction(transactionId).send((res,error) => {
                     if (!error) {
                            callback(res, 0);   
                     }
                        else {
                            callback(null, error);
                            }
                     });
            } catch (err) {
                callback(0, err);
               }
         }       
        
         
function setNewAdmin(web3, address, abi, newAdmin, callback) {
    var res
                                       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
                try {
                    BetaWalletContract.methods.setNewAdmin(newAdmin).send((res,error) => {
                     if (!error) {
                            callback(res, 0);   
                     }
                        else {
                            callback(null, error);
                            }
                     });
            } catch (err) {
                callback(0, err);
               }
         }       
    
         
function withdraw_ether(web3, address, abi, callback) {
    var res
                                               
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
                try {
                    BetaWalletContract.methods.withdraw_ether((res,error) => {
                        if (!error) {
                             callback(res, 0);   
                        }
                         else {
                            callback(null, error);
                             }
                        });
            } catch (err) {
                callback(0, err);
                 }
            }       
      
            
   
         
function withdraw_token(web3, address, abi, token_amount, callback) {
    var res
                                                           
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
                try {
                    BetaWalletContract.methods.withdraw_token(token_amount),send((res,error) => {
                        if (!error) {
                             callback(res, 0);   
                          }
                         else {
                             callback(null, error);
                              }
                        });
            } catch (err) {
                 callback(0, err);
                 }
             }       
                           
module.exports = {
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
  }