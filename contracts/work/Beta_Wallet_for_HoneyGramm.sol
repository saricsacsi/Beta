pragma solidity ^0.4.17;


import "./BetatokenERC223_v3.sol";


contract Beta_Wallet_for_HoneyGramm {

    address private _owner;
    address public admin;
    address public beneficiary;
    mapping(address => uint32) private _owners;

    BetaToken token;

    uint32 private MIN_SIGNATURES;
    uint private _transactionIdx;

    struct Transaction {
        address from;
        address to;
        uint amount;
        uint32 signatureCount;
        mapping (address => uint32) signatures;
    }

    mapping (uint => Transaction) private _transactions;
    uint[] private _pendingTransactions;

    modifier isOwner() {
        require(msg.sender == _owner);
        _;
    }

    modifier validOwner() {

        require((msg.sender == _owner) || (_owners[msg.sender] == 1));
        _;
    }

    event DepositFunds(address from, uint amount);
    event TransactionCreated(address from, address to, uint amount, uint transactionId);
    event DeleteTransaction(uint transactionId);
    event TransactionCompleted(address from, address to, uint amount, uint transactionId);
    event TransactionSigned(address by, uint transactionId);
    event LogTokenPayable(address _from, uint _value);
    event SignatureCount(uint32 signatureCount, uint transactionId);


    constructor(address _betaTokenAddr) 
        public {
        _owner = msg.sender;
        token = BetaToken(_betaTokenAddr);
    }

    function setAdmin(address _admin)
        public {
        admin = _admin;
    }

    function setBeneficiray(address _beneficiary)
        public {
        beneficiary = _beneficiary;
    }

    function addOwner(address owner) // ne ezerszer adja hozza
      //  isOwner
        private {
        _owners[owner] = 1;
    }

    function removeOwner(address owner) // ne ezerszer adja hozza
       // isOwner
        private {
        _owners[owner] = 0;
    }

    function ()
        public
        payable {
        emit DepositFunds(msg.sender, msg.value);
    }
    
    function withdraw_ether()
        public {
        _owner.transfer(address(this).balance);
    }



// tx tipusa, hany aláirás kell, ha token küldés akkor csak 2, ha más szabály is van akkor 3
// ezen még lehet alakitani kell
    function getMinSignatures(uint _typeofTransaction) internal pure returns (uint32) {
        if (_typeofTransaction == 0)
            return 2;     
        if (_typeofTransaction == 1)
            return 3;         
        else
            return 2;
    }   

 

// most ezen dolgozom //
    function transferToToken(address to, uint amount, uint32 typeofTransaction)
        validOwner
        public {
        require(token.balanceOf(address(this)) >= amount);
        uint transactionId = _transactionIdx++; /// ezzel valamit kezdeni kell
        
        addOwner(to);  
        addOwner(admin);
        
        MIN_SIGNATURES = getMinSignatures(typeofTransaction);

        Transaction memory transaction;
        transaction.from = msg.sender;
        transaction.to = to;
        transaction.amount = amount;
        transaction.signatureCount = 0; ///

        _transactions[transactionId] = transaction;
        _pendingTransactions.push(transactionId);
       
        getPendingTransactions();
        signTransaction(transactionId);


        emit TransactionCreated(msg.sender, to, amount, transactionId); 
        emit SignatureCount(transaction.signatureCount, transactionId);             
        
    }

    function getPendingTransactions()
      view
      //validOwner
      public
      returns (uint[]) {
        return _pendingTransactions;
    }

    function signTransaction(uint transactionId)
      validOwner
      public {

        Transaction storage transaction = _transactions[transactionId];


      // Transaction must exist
        require(0x0 != transaction.from);

      // Creator cannot sign the transaction
      //  require(msg.sender != transaction.from);

      // Cannot sign a transaction more than once
        //require(transaction.signatures[msg.sender] == 0);

       // transaction.signatures[msg.sender] = 1;
        transaction.signatureCount++;

        emit TransactionSigned(msg.sender, transactionId);
        emit SignatureCount(transaction.signatureCount, transactionId);
//ezt külön kell venni vagy ez mindig tokent küld


        if (transaction.signatureCount == MIN_SIGNATURES) {

            require(token.balanceOf(address(this)) >= transaction.amount);

            token.transfer(transaction.to, transaction.amount); //  ide kell a token.transfer is

            TransactionCompleted(transaction.from, transaction.to, transaction.amount, transactionId);
          
            removeOwner(transaction.to);
            //removeOwner(admin); // ebben nem vagyok biztos
            

            deleteTransaction(transactionId);
      }
    }

    function deleteTransaction(uint transactionId)
      validOwner
      public {
        uint32 replace = 0;
        for(uint i = 0; i < _pendingTransactions.length; i++) {
            if (1 == replace) {
                _pendingTransactions[i-1] = _pendingTransactions[i];
        } else if (transactionId == _pendingTransactions[i]) {
            replace = 1;
        }
        }
        delete _pendingTransactions[_pendingTransactions.length - 1];
        _pendingTransactions.length--;
        delete _transactions[transactionId];
        
        emit DeleteTransaction(transactionId);
    }

    function walletBalance()
      view
      public
      returns (uint) {
        return address(this).balance;
    }

    function walletBalanceOfToken()
      view
      public
      returns (uint) {
        return token.balanceOf(address(this));
    }

    function is_owner(address who) public view returns (uint32) {
        return _owners[who];
    }

    function tokenFallback(address _from, uint _value, bytes _data)
      public
       { 
        emit LogTokenPayable(_from, _value);
    }
    function tesztelAPA(address _who) public view returns (bool)
         { 
        return ((_who == _owner) || (_owners[_who] == 1));
    }
}