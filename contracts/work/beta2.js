/**
 * IMPLEMENTATION in javascript 
 * You have to declare these variables globally for the funtions
* const address = 'address of the contract that we are using in string';
* const abi = require('abi of the contract that we are using in a json file');
* const Web3 = require('web3');
* const web3 = new Web3(); <--(here you can set the provider)
*/
const Web3 = require('web3');

/**
 * Calls a contract function to get the owner of the wallet.
 *
 * @method owner().call get the address of the owner
 * @param web3 creating a web3 connection for the function whenever it is called
 * @param address address of the contract that we are using
 * @param abi abi of the contract that we are using
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {String} the address of the owner
 */

function getOwnerOfWallet(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          
       
    try {
        BetaWalletContract.methods.owner().call((error, res) => {
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
/**
 * Calls a contract function to get the admin of the wallet.
 *
 * @method admin().call get the address of the admin
 * @param web3 creating a web3 connection for the function whenever it is called
 * @param address address of the contract that we are using
 * @param abi abi of the contract that we are using
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {String} the address of the admin
 */
function getAdminrOfWallet(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          
       
    try {
       BetaWalletContract.methods.admin().call((error, res) =>  {
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




/**
 * Calls a contract function to get the ID-s of the pending transactions.
 *
 * @method getPendingTransactions().call get the ID-s of the pending transactions
 * @param web3 creating a web3 connection for the function whenever it is called
 * @param address address of the contract that we are using
 * @param abi abi of the contract that we are using
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {Array} the ID-s of the pending transactions
 */

function getPendingTransactions(web3, address, abi, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
        // initiate contract for an address
    
            try {
                BetaWalletContract.methods.getPendingTransactions().call((error, res) => {
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

/**
 * Calls a contract function to get the balance of ethers in the wallet.
 *
 * @method walletBalance().call get the ether balance of the wallet
 * @param web3 creating a web3 connection for the function whenever it is called
 * @param address address of the contract that we are using
 * @param abi abi of the contract that we are using
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {Number} the balance of ethers in the wallet
 */

function walletBalance(web3, address, abi, callback) {
    var res,balance
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.methods.walletBalance().call((error, res) => {
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

/**
 * Calls a contract function to get the balance of tokens in the wallet.
 *
 * @method walletBalance().call get the balance of tokens in the wallet
 * @param web3 creating a web3 connection for the function whenever it is called
 * @param address address of the contract that we are using
 * @param abi abi of the contract that we are using
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {Number} the balance of tokens in the wallet
 */
function BalanceOfToken(web3, address, abi, callback) {
    var res,balance
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                BetaWalletContract.methods.walletBalanceOfToken().call((error, res) => {
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
/**
 * Calls a contract function to get the admin of the wallet.
 *
 * @method check_permitting(who,transactionId).call check if the given address has got authorisation to sign the transaction given by the transactionId
 *      @param who the address that we are checking
 *      @param transactionId the Id of the transaction that we are checking
 * @param web3 creating a web3 connection for the function whenever it is called
 * @param address address of the contract that we are using
 * @param abi abi of the contract that we are using
 * @param {function} If the last argument is a function, the contract function
 *   call will be asynchronous, and the callback will be passed the
 *   error and result.
 * @return {boolean} true if the address can sign the transaction
 */
        
function check_permitting(web3, address, abi, who, transactionId, callback) {
    var res
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
          // initiate contract for an address
    
            try {
                 BetaWalletContract.methods.check_permitting(who, transactionId).call((error, res) => {
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


 

function transferToToken(web3, calleraddress, privateKey, address, abi, beneficiary, amount, type,  callback) {
    var res
       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);

            try {
                web3.eth.getTransactionCount(calleraddress).then( (nonce) => {
                    let encodedABI = BetaWalletContract.methods.transferToToken(beneficiary, amount, type).encodeABI();
             BetaWalletContract.methods.transferToToken(beneficiary, amount, type).estimateGas({ 
                from: calleraddress }, (error, gasEstimate) => {
                  let tx = {
                    to: address,
                    gas: gasEstimate + 200000,
                    data: encodedABI,
                    nonce: nonce
                  };
                  web3.eth.accounts.signTransaction(tx, privateKey, (error, res) => {
                    if (res == null) {callback(error, null); 
                    } 
                    else {
                      let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
                      tran.on('transactionHash', (txhash) =>
                       {
                        callback(0, txhash); 
                        });
                     }
                   })
                 })
              })

            } catch (err) {
                callback(err, 0);
            }
        }


        
function sign_TransferToToken(web3, sign_address, sign_privateKey, address, abi, transactionId, callback) {
    var res
                       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
           try {
                web3.eth.getTransactionCount(sign_address).then( (nonce) => {
                    let encodedABI = BetaWalletContract.methods.sign_TransferToToken(transactionId).encodeABI();
             BetaWalletContract.methods.sign_TransferToToken(transactionId).estimateGas({ 
                from: sign_address }, (error, gasEstimate) => {
                  let tx = {
                    to: address,
                    gas: gasEstimate + 200000,
                    data: encodedABI,
                    nonce: nonce
                  };
                  web3.eth.accounts.signTransaction(tx, sign_privateKey, (error, res) => {
                    if (res == null) {callback(error, null); 
                    } 
                    else {
                      let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
                      tran.on('transactionHash', (txhash) =>
                       {
                        callback(0, txhash); 
                        });
                     }
                   })
                 })
              })

            } catch (err) {
                callback(err, 0);
            }
        }  

        
function deletePendingTransaction(web3, sign_address, sign_privateKey, address, abi, del_transactionId, callback) {
    var res
                                       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
    try {
        web3.eth.getTransactionCount(sign_address).then( (nonce) => {
            let encodedABI = BetaWalletContract.methods.deletePendingTransaction(del_transactionId).encodeABI();
     BetaWalletContract.methods.deletePendingTransaction(del_transactionId).estimateGas({ 
        from: sign_address }, (error, gasEstimate) => {
          let tx = {
            to: address,
            gas: gasEstimate + 200000,
            data: encodedABI,
            nonce: nonce
          };
          web3.eth.accounts.signTransaction(tx, sign_privateKey, (error, res) => {
            if (res == null) {callback(error, null); 
            } 
            else {
              let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
              tran.on('transactionHash', (txhash) =>
               {
                callback(0, txhash); 
                });
             }
           })
         })
      })

    } catch (err) {
        callback(err, 0);
    }
}  
         
function setNewAdmin(web3,admin_address, admin_privateKey, address, abi, newAdmin, callback) {
    var res
                                       
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
    try {
        web3.eth.getTransactionCount(admin_address).then( (nonce) => {
            let encodedABI = BetaWalletContract.methods.setNewAdmin(newAdmin).encodeABI();
     BetaWalletContract.methods.setNewAdmin(newAdmin).estimateGas({ 
        from: admin_address }, (error, gasEstimate) => {
          let tx = {
            to: address,
            gas: gasEstimate + 200000,
            data: encodedABI,
            nonce: nonce
          };
          web3.eth.accounts.signTransaction(tx, admin_privateKey, (error, res) => {
            if (res == null) {callback(error, null); 
            } 
            else {
              let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
              tran.on('transactionHash', (txhash) =>
               {
                callback(0, txhash); 
                });
             }
           })
         })
      })

    } catch (err) {
        callback(err, 0);
    }
}  
         
function withdraw_ether(web3, calleraddress, privateKey, address, abi, callback) {
    var res
                                               
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
    try {
        web3.eth.getTransactionCount(calleraddress).then( (nonce) => {
            let encodedABI = BetaWalletContract.methods.withdraw_ether().encodeABI();
     BetaWalletContract.methods.withdraw_ether().estimateGas({ 
        from: calleraddress }, (error, gasEstimate) => {
          let tx = {
            to: address,
            gas: gasEstimate + 200000,
            data: encodedABI,
            nonce: nonce
          };
          web3.eth.accounts.signTransaction(tx, privateKey, (error, res) => {
            if (res == null) {callback(error, null); 
            } 
            else {
              let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
              tran.on('transactionHash', (txhash) =>
               {
                callback(0, txhash); 
                });
             }
           })
         })
      })

    } catch (err) {
        callback(err, 0);
    }
}  
    
         
function withdraw_token(web3,calleraddress, privateKey, address, abi, token_amount, callback) {
    var res
                                                           
    const BetaWalletContract =  new web3.eth.Contract(abi, address);
    try {
        web3.eth.getTransactionCount(calleraddress).then( (nonce) => {
            let encodedABI = BetaWalletContract.methods.withdraw_token(token_amount).encodeABI();
     BetaWalletContract.methods.withdraw_token(token_amount).estimateGas({ 
        from: calleraddress }, (error, gasEstimate) => {
          let tx = {
            to: address,
            gas: gasEstimate + 200000,
            data: encodedABI,
            nonce: nonce
          };
          web3.eth.accounts.signTransaction(tx, privateKey, (error, res) => {
            if (res == null) {callback(error, null); 
            } 
            else {
              let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
              tran.on('transactionHash', (txhash) =>
               {
                callback(0, txhash); 
                });
             }
           })
         })
      })

    } catch (err) {
        callback(err, 0);
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