pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./Pausable.sol";
import "./SafeMath.sol";
import "./BetaToken.sol";




contract WorkWithBetaToken is Ownable, Pausable{
  using SafeMath for uint256;

  // The token being sold
  BetaToken public token; 
  
  
 

  uint256 public decimals = 18;  

  uint256 public oneCoin = 10**decimals;

  address public multiSig; 

  // ***************************
  // amount of raised money in wei
  uint256 public weiRaised;

  // amount of raised tokens
  uint256 public tokenRaised;
  
  // number of participants in presale
  uint256 public numberOfPurchasers = 0;

  event HostEther(address indexed buyer, uint256 value);
  event TokenPlaced(address indexed beneficiary, uint256 amount); 
  event SetWallet(address _newWallet);
  event SendedEtherToMultiSig(address walletaddress, uint256 amountofether);

  function setWallet(address _newWallet) public onlyOwner {
    multiSig = _newWallet;
    SetWallet(_newWallet);
}

  constructor(BetaToken _tokenAddress) public {
      
    token = _tokenAddress;  
}
  
// @return true if crowdsale event has ended
    function hasEnded() public view returns (bool) {
        if (block.timestamp > publicsaleEnd)
        return true;
        if (tokenRaised >= maxTokens)
        return true; // if we reach the tokensForSale
        return false;
    }

  
    modifier onlyAdmin() {
        require(msg.sender == Admin);
        _;
    }

    modifier onlyOwnerOrAdmin() {
        require(msg.sender == Admin || msg.sender == owner);
        _;
    }

  /**
  * @dev throws if person sending is not authorised or sends nothing
  */
    modifier onlyAuthorised() {
        require (authorised[msg.sender] || freeForAll);
        require ((now >= presaleStart && presaleEnd >= now) || (now >= publicsaleStart && publicsaleEnd >= now));
        require (!hasEnded());
        require (wallet != 0x0);
        require (msg.value > 1 finney);
        require(tokensForPreSale > tokenRaised); // check we are not over the number of tokensForSale
        _;
    }
  /**
  * @dev authorise an account to participate
  */
    function authoriseAccount(address whom) onlyAdmin public {
        authorised[whom] = true;
    }

  /**
  * @dev authorise a lot of accounts in one go
  */
    function authoriseManyAccounts(address[] many) onlyAdmin public {
        for (uint256 i = 0; i < many.length; i++) {
            authorised[many[i]] = true;
        }
    }

  /**
  * @dev ban an account from participation (default)
  */
    function blockAccount(address whom) onlyAdmin public {
        authorised[whom] = false;
    }

  /**
  * @dev set a new Admin representative
  */
    function setAdmin(address newAdmin) onlyOwner public {
        Admin = newAdmin;
    }
  function placeTokens(address beneficiary, uint256 _tokens) onlyOwner public {
    
    require(_tokens != 0);
    require (beneficiary != 0x0);
   // require(!hasEnded());
    //require(tokenRaised.add(_tokens) <= maxTokens);

    if (token.balanceOf(beneficiary) == 0) {
      numberOfPurchasers++;
    }
    tokenRaised = tokenRaised.add(_tokens); // so we can go slightly over
    token.mint(beneficiary, _tokens);
    TokenPlaced(beneficiary, _tokens); 
  }

  // low level token purchase function
  function buyTokens(address buyer, uint256 amount) whenNotPaused internal {
    
    require (multiSig != 0x0);
    //require (msg.value >= 2 ether);
    // update state
    weiRaised = weiRaised.add(amount);
   
    HostEther(buyer, amount);
    // send the ether to the MultiSig Wallet
    multiSig.transfer(this.balance);     // better in case any other ether ends up here
    SendedEtherToMultiSig(multiSig,amount);
  }

  // transfer ownership of the token to the owner of the presale contract
  function transferTokenContractOwnership(address _address) public onlyOwner {
   
    token.transferOwnership(_address);
   
  }

  // fallback function can be used to buy tokens
  function () public payable {
    buyTokens(msg.sender, msg.value);
  }

  function emergencyERC20Drain( ERC20 oddToken, uint amount ) public onlyOwner{
    oddToken.transfer(owner, amount);
  }
}