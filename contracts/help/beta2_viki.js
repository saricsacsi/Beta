
const Web3 = require('web3');


/*
 call the public variables:
_owner 
admin 
*/
function getOwnerOfWallet(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          
       
    try {
        BetaWalletContract.admin(function(res,error) {
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

function getAdminrOfWallet(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          
       
    try {
        BetaWalletContract.admin(function(res,error) {
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
call the getter functions:
getPendingTransactions()
walletBalance()
walletBalanceOfToken()
check_permitting(address _who, uint _transactionId)
*/
function getPendingTransactions(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
        // initiate contract for an address
    
            try {
                BetaWalletContract.getPendingTransactions(function(res,error) {
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


function walletBalance(web3, address, abi, callback) {
    var res,balance
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.walletBalance(function(error, res) {
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


function BalanceOfToken(web3, address, abi, callback) {
    var res,balance
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.walletBalanceOfToken(function(error, res) {
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

function check_permitting(web3, address, abi, who, transactionId, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          // initiate contract for an address
    
            try {
                 BetaWalletContract.check_permitting(who, transactionId, function(res,error) {
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


 

function transferToToken(web3, address, abi, beneficiary, amount, type, callback) {
    var res
       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.transferToToken(beneficiary, amount, type, function(error, res) {
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
                BetaWalletContract.signTransaction(transactionId, function(error, res) {
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
                    BetaWalletContract.deletePendingTransaction(transactionId, function(error, res) {
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
                    BetaWalletContract.setNewAdmin(newAdmin, function(error, res) {
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
                    BetaWalletContract.withdraw_ether(function(error, res) {
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
                    BetaWalletContract.withdraw_token(token_amount,function(error, res) {
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