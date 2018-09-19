pragma solidity ^0.4.24;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;


    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
    );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
    constructor() public {
        owner = msg.sender;
    }

  /**
   * @dev Throws if called by any account other than the owner.
   */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
    function renounceOwnership() public onlyOwner {
        emit OwnershipRenounced(owner);
        owner = address(0);
    }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
    function transferOwnership(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0));
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}


/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Ownable {
    event Pause();
    event Unpause();

    bool public paused = false;


  /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

  /**
   * @dev Modifier to make a function callable only when the contract is paused.
   */
    modifier whenPaused() {
        require(paused);
        _;
    }

  /**
   * @dev called by the owner to pause, triggers stopped state
   */
    function pause() onlyOwner whenNotPaused public {
        paused = true;
        emit Pause();
    }

  /**
   * @dev called by the owner to unpause, returns to normal state
   */
    function unpause() onlyOwner whenPaused public {
        paused = false;
        emit Unpause();
    }
}


/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
    }

        c = a * b;
        assert(c / a == b);
        return c;
    }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return a / b;
    }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
}

library Addresses {
  function isContract(address _base) internal constant returns (bool) {
      uint codeSize;
      assembly {
          codeSize := extcodesize(_base)
      }
      return codeSize > 0;
  }
}

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 {
  function totalSupply() public view returns (uint256);

  function balanceOf(address _who) public view returns (uint256);

  function allowance(address _owner, address _spender)
    public view returns (uint256);

  function transfer(address _to, uint256 _value) public returns (bool);

  function approve(address _spender, uint256 _value)
    public returns (bool);

  function transferFrom(address _from, address _to, uint256 _value)
    public returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}


 /* ERC223 contract interface */
 
contract ERC223 {
  
  function transfer(address to, uint value, bytes data) public returns (bool ok);
   
  event Transfer(address indexed from, address indexed to, uint value, bytes indexed data);
}

 /**
 * @title Contract that will work with ERC223 tokens.
 */
contract ERC223ReceivingContract {
    function tokenFallback(address _from, uint _value, bytes _data) public;
}
/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * https://github.com/ethereum/EIPs/issues/20
 * Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract StandardToken is ERC20, ERC223 {
  using SafeMath for uint256;
  using Addresses for address;

  mapping(address => uint256) balances;

  mapping (address => mapping (address => uint256)) internal allowed;

  uint256 totalSupply_;

  /**
  * @dev Total number of tokens in existence
  */
  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }

  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param _owner address The address which owns the funds.
   * @param _spender address The address which will spend the funds.
   * @return A uint256 specifying the amount of tokens still available for the spender.
   */
  function allowance(
    address _owner,
    address _spender
   )
    public
    view
    returns (uint256)
  {
    return allowed[_owner][_spender];
  }


    function transfer(address _to, uint _value)
        public
        returns (bool) {
        return transfer(_to, _value, "");
    }

    function transfer(address _to, uint _value, bytes _data)
        public
        returns (bool) {
        if (_value > 0) {

            if (_to.isContract()) {
              ERC223ReceivingContract _contract = ERC223ReceivingContract(_to);
              _contract.tokenFallback(msg.sender, _value, _data);
            }

            balances[msg.sender] = balances[msg.sender].sub(_value);
            balances[_to] = balances[_to].add(_value);
            emit Transfer(msg.sender, _to, _value, _data);
            return true;
        }
        return false;
    }




  /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   * Beware that changing an allowance with this method brings the risk that someone may use both the old
   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value) public returns (bool) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }
    function transferFrom(address _from, address _to, uint _value)
        public
        returns (bool) {
        return transferFrom(_from, _to, _value, "");
    }


 function transferFrom(address _from, address _to, uint _value, bytes _data) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);

         if (_to.isContract()) {
                ERC223ReceivingContract _contract = ERC223ReceivingContract(_to);
                _contract.tokenFallback(msg.sender, _value, _data);
              }

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }






  
  /**
   * @dev Increase the amount of tokens that an owner allowed to a spender.
   * approve should be called when allowed[_spender] == 0. To increment
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param _spender The address which will spend the funds.
   * @param _addedValue The amount of tokens to increase the allowance by.
   */
  function increaseApproval(
    address _spender,
    uint256 _addedValue
  )
    public
    returns (bool)
  {
    allowed[msg.sender][_spender] = (
      allowed[msg.sender][_spender].add(_addedValue));
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  /**
   * @dev Decrease the amount of tokens that an owner allowed to a spender.
   * approve should be called when allowed[_spender] == 0. To decrement
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param _spender The address which will spend the funds.
   * @param _subtractedValue The amount of tokens to decrease the allowance by.
   */
  function decreaseApproval(
    address _spender,
    uint256 _subtractedValue
  )
    public
    returns (bool)
  {
    uint256 oldValue = allowed[msg.sender][_spender];
    if (_subtractedValue >= oldValue) {
      allowed[msg.sender][_spender] = 0;
    } else {
      allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
    }
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

}

 /**
 * @title Burnable Token
 * @dev Token that can be irreversibly burned (destroyed).
 */
contract BurnableToken is StandardToken {

  event Burn(address indexed burner, uint256 value);

  /**
   * @dev Burns a specific amount of tokens.
   * @param _value The amount of token to be burned.
   */
  function burn(uint256 _value) public {
    _burn(msg.sender, _value);
  }

  /**
   * @dev Burns a specific amount of tokens from the target address and decrements allowance
   * @param _from address The address which you want to send tokens from
   * @param _value uint256 The amount of token to be burned
   */
  function burnFrom(address _from, uint256 _value) public {
    require(_value <= allowed[_from][msg.sender]);
    // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
    // this function needs to emit an event with the updated approval.
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    _burn(_from, _value);
  }

  function _burn(address _who, uint256 _value) internal {
    require(_value <= balances[_who]);
    // no need to require value <= totalSupply, since that would imply the
    // sender's balance is greater than the totalSupply, which *should* be an assertion failure

    balances[_who] = balances[_who].sub(_value);
    totalSupply_ = totalSupply_.sub(_value);
    emit Burn(_who, _value);
    emit Transfer(_who, address(0), _value);
  }
}

/**
 * @title Mintable token
 * @dev Simple ERC20 Token example, with mintable token creation
 * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 */
contract MintableToken is StandardToken, Ownable{
    event Mint(address indexed to, uint256 amount);
    event MintFinished();

    bool public mintingFinished = false;


    modifier canMint() {
        require(!mintingFinished);
        _;
    }

    modifier hasMintPermission() {
        require(msg.sender == owner);
        _;
    }

  /**
   * @dev Function to mint tokens
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
    function mint(
        address _to,
        uint256 _amount
  )
    hasMintPermission
    canMint
    public
    returns (bool)
  {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

  /**
   * @dev Function to stop minting new tokens.
   * @return True if the operation was successful.
   */
    function finishMinting() onlyOwner canMint public returns (bool) {
        mintingFinished = true;
        emit MintFinished();
        return true;
    }
}


// ***********************************************************************************
// *************************** END OF THE BASIC **************************************
// ***********************************************************************************



contract BetaToken is MintableToken, BurnableToken {
  // Coin Properties
    string public name = "BETATOKEN";
    string public symbol = "BETA";
    uint256 public decimals = 18;

  // Special propeties
    bool public canMove = false;

  /**
  * @dev modifier that throws if moving has not started yet
   */
    modifier onlyIfCanMove() {
        require(canMove);
        _;
    }

  /**
  * @dev Allows the owner to enable the moving. This can not be undone
  */
    function startMove() public onlyOwner {
        canMove = true;
    }

  /**
  * @dev Allows anyone to transfer the Beta tokens once moving was started
  * @param _to the recipient address of the tokens.
  * @param _value number of tokens to be transfered.
   */
    function transfer(address _to, uint _value) onlyIfCanMove public returns (bool) {
        return super.transfer(_to, _value);
    }

    function transfer(address _to, uint _value, bytes _data) onlyIfCanMove public returns (bool) {
        return super.transfer(_to, _value, _data);
    }


  /**
  * @dev Allows anyone to transfer the Beta tokens once moving has started
  * @param _from address The address which you want to send tokens from
  * @param _to address The address which you want to transfer to
  * @param _value uint the amout of tokens to be transfered
   */
    function transferFrom(address _from, address _to, uint _value) onlyIfCanMove public returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }
    function transferFrom(address _from, address _to, uint _value, bytes _data) onlyIfCanMove public returns (bool) {
        return super.transferFrom(_from, _to, _value, _data);
    }





    function emergencyERC20Drain( ERC20 oddToken, uint amount ) public {
        oddToken.transfer(owner, amount);
    }
}



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