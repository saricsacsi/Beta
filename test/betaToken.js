var BetaToken = artifacts.require("./BetaToken.sol")

contract('BetaToken', function(accounts) {
    it("should put 1000 BetaToken in the first account", function() {
        return BetaToken.deployed()
        .then(function(instance) {app = instance; return app.mint(accounts[0], 1000);})
        
    })
    it(" should check 1 account balance = 1000", function() {
        return BetaToken.deployed()
        .then(function(instance) { balance = instance; return balance.balanceOf(accounts[0]);})
        .then(function(check) { assert.equal(check, 1000, "nope");})
    })
    it("should send coin correctly", function() {
        var beta;
    
        // Get initial balances of first and second account.
        var account_one = accounts[0];
        var account_two = accounts[1];
    
        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;
    
        var amount = 10;
    
        return BetaToken.deployed().then(function(instance) {
          beta = instance;
          return beta.balanceOf.call(account_one);
        }).then(function(balance) {
          account_one_starting_balance = balance.toNumber();
          return beta.balanceOf.call(account_two);
        }).then(function(balance) {
          account_two_starting_balance = balance.toNumber();
          return beta.transfer(account_two, amount,{from: account_one});
        }).then(function() {
          return beta.balanceOf.call(account_one);
        }).then(function(balance) {
          account_one_ending_balance = balance.toNumber();
          return beta.balanceOf.call(account_two);
        }).then(function(balance) {
          account_two_ending_balance = balance.toNumber();
    
          assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
          assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
        });
      });
})
