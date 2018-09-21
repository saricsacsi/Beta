pragma solidity ^0.4.17;


import "./BetatokenERC223_v3.sol";


contract Beta_Wallet_for_HoneyGramm {

    address private _owner;
    address public admin;
    //address public beneficiary;
    mapping(address => uint32) private _permitting; // nem is kell talán
    mapping (uint => mapping (address => bool)) public beneficiary;

    BetaToken  public token;

    //uint32 private MIN_SIGNATURES;
    uint private _transactionIdx;

    struct Transaction {
        address from;
        address to;
        uint amount;
        uint32 MIN_SIGNATURES;
        uint32 signatureCount;
        mapping (address => uint32) signatures; //nem biztos hogy kell 
        // ke lehet venni a structbol a confirmations mintájára vagy 
        // legyen bool
    }

    mapping (uint => Transaction) private _transactions;
    uint[] private _pendingTransactions;

    modifier OnlyOwner() {
        require(msg.sender == _owner);
        _;
    }
    modifier OnlyOwnerOrAdmin() {
        require((msg.sender == _owner) || (msg.sender == admin));
        _;
    }

    modifier OnlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    /// itt tartok, ezt kell átgondolni///
    modifier OnlyPermitting(uint _transactionId) {

        require((msg.sender == _owner) || (msg.sender == admin) || (beneficiary[_transactionId][msg.sender] == true));
        _;
    }
/*
meg kellnézni mit kell indexelni majd !!!!!!
*****************************************************************************
*/
    event DepositFunds(address indexed from, uint indexed amount);
    event TransactionCreated(address indexed from, address indexed to, uint indexed amount, uint transactionId);
    event DeletePendingTransaction(uint transactionId);
    event TransactionCompleted(address indexed from, address indexed to, uint indexed amount, uint transactionId);
    event TransactionSigned(address indexed by, uint indexed transactionId);
    event LogTokenPayable(address _from, uint _value, bytes _data);
    event SignatureCount(uint32 signatureCount, uint transactionId);


    constructor(address _betaTokenAddr, address _admin) 
        public {
        admin = _admin;
        _owner = msg.sender;
        token = BetaToken(_betaTokenAddr);
    }

    function setNewAdmin(address _newAdmin)
        OnlyAdmin
        public {
        require(_newAdmin != 0x0);
        admin = _newAdmin;
    }

    function ()
        public
        payable {
        emit DepositFunds(msg.sender, msg.value);
    }
    
    function withdraw_ether()
        OnlyOwner
        public {
        _owner.transfer(address(this).balance);
    }

    function withdraw_token(uint _amount)
        OnlyOwner
        public {
        token.transfer(_owner, _amount);
    }



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
        OnlyOwnerOrAdmin
        public {
        require(token.balanceOf(address(this)) >= amount);
        uint transactionId = _transactionIdx++;    
        

        Transaction memory transaction;
        transaction.from = msg.sender;
        transaction.to = to;
        transaction.amount = amount;
        transaction.signatureCount = 0; 
        transaction.MIN_SIGNATURES = getMinSignatures(typeofTransaction);///

        _transactions[transactionId] = transaction;
        _pendingTransactions.push(transactionId);

        beneficiary[transactionId][to] = true;
       
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
      OnlyPermitting(transactionId)
      public {

        Transaction storage transaction = _transactions[transactionId];


      // Transaction must exist
        require(0x0 != transaction.from);

      // Creator cannot sign the transaction
      //  require(msg.sender != transaction.from);

     //Cannot sign a transaction more than once
        require(transaction.signatures[msg.sender] == 0);
        transaction.signatures[msg.sender] = 1;

        transaction.signatureCount++;

        emit TransactionSigned(msg.sender, transactionId);
        emit SignatureCount(transaction.signatureCount, transactionId);

        if (transaction.signatureCount == transaction.MIN_SIGNATURES) {
            require(token.balanceOf(address(this)) >= transaction.amount);
            token.transfer(transaction.to, transaction.amount);
            emit TransactionCompleted(transaction.from, transaction.to, transaction.amount, transactionId);
                             
            deletePendingTransaction(transactionId);
      }
    }

    function deletePendingTransaction(uint transactionId)
       OnlyPermitting(transactionId) // meg kell nézni ki tudja hivni
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
        
        emit DeletePendingTransaction(transactionId);
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
 
    function tokenFallback(address _from, uint _value, bytes _data)
      public
       { 
        emit LogTokenPayable(_from, _value, _data);
    }

    function check_permitting(address _who, uint _transactionId) public view returns (bool)
         { 
        return ((_who == _owner) || (_who == admin) || (beneficiary[_transactionId][_who] == true));
    }
}