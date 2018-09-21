function getAdminrOfWallet(address, abi) {
    var res
    var Contract = web3.eth.contract(abi);
    
        // initiate contract for an address
    var BetaWalletContract = Contract.at(address);
          
        BetaWalletContract.admin(function(error, res) {
            
          });
          
        }