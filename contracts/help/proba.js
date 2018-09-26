web3.eth.getTransactionCount(functioncalleraddress).then( (nonce) => {
        let encodedABI = contractInstance.methods.statechangingfunction().encodeABI();
 contractInstance.methods.statechangingfunction().estimateGas({ 
     from: calleraddress }, (error, gasEstimate) => {
          let tx = {
            to: contractAddress,
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