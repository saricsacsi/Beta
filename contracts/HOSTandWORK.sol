pragma solidity ^0.4.8;

 

/*
Base class contracts willing to accept ERC223 token transfers must conform to.

Sender: msg.sender to the token contract, the address originating the token transfer.
          - For user originated transfers sender will be equal to tx.origin
          - For contract originated transfers, tx.origin will be the user that made the tx that produced the transfer.
Origin: the origin address from whose balance the tokens are sent
          - For transfer(), origin = msg.sender
          - For transferFrom() origin = _from to token contract
Value is the amount of tokens sent
Data is arbitrary data sent with the token transfer. Simulates ether tx.data

From, origin and value shouldn't be trusted unless the token contract is trusted.
If sender == tx.origin, it is safe to trust it regardless of the token.
*/

contract ERC223Receiver {
  //function tokenFallback(address _sender, address _origin, uint _value, bytes _data) returns (bool ok);
  // function totalSupply() public view returns (uint256);
}

/* ERC223 additions to ERC20 */
contract Standard223Receiver  is ERC223Receiver {
  //
  
    struct TKN {
        address sender;
        uint value;
        bytes data;
        bytes4 sig;
    }
    
    
    function tokenFallback(address _from, uint _value, bytes _data) public pure {

         bool __isTokenFallback;
      TKN memory tkn;
      tkn.sender = _from;
      tkn.value = _value;
      tkn.data = _data;
      uint32 u = uint32(_data[3]) + (uint32(_data[2]) << 8) + (uint32(_data[1]) << 16) + (uint32(_data[0]) << 24);
      tkn.sig = bytes4(u);
      
      /* tkn variable is analogue of msg variable of Ether transaction
      *  tkn.sender is person who initiated this token transaction   (analogue of msg.sender)
      *  tkn.value the number of tokens that were sent   (analogue of msg.value)
      *  tkn.data is data of token transaction   (analogue of msg.data)
      *  tkn.sig is 4 bytes signature of function
      *  if data of token transaction is a function execution
      */
    }
    __isTokenFallback = true;
    if (!address(this).delegatecall(_data)) return false;

    // avoid doing an overwrite to .token, which would be more expensive
    // makes accessing .tkn values outside tokenPayable functions unsafe
    __isTokenFallback = false;

    return true;
  }
/*
  function getSig(bytes _data) private returns (bytes4 sig) {
    uint l = _data.length < 4 ? _data.length : 4;
    for (uint i = 0; i < l; i++) {
      sig = bytes4(uint(sig) + uint(_data[i]) * (2 ** (8 * (l - 1 - i))));
    }
  }
*/
  

  modifier tokenPayable {
   require(__isTokenFallback);
    _;
  }

 // function supportsToken(address token)  public (bool);


/*

contract ExampleReceiver is Standard223Receiver {



  function foo()  public tokenPayable {
    LogTokenPayable(1, Tkn.addr, Tkn.sender, Tkn.value);
  }

  function ()  public tokenPayable {
    LogTokenPayable(0, Tkn.addr, Tkn.sender, Tkn.value);
  }

  event LogTokenPayable(uint i, address token, address sender, uint value);

*/
  
}
