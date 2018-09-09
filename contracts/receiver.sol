pragma solidity ^0.4.9;

 /*
 * Contract that is working with ERC223 tokens
 */
 
 contract ContractReceiver {
     event LogTokenPayable(address sender, uint value);

    address public from;
    uint public value; 
    
    
    function tokenFallback(address _from, uint _value, bytes _data) public pure {
    from = _from;
    value = _value;
    address(this).delegatecall(_data);
      
    }

    function foo() {
    LogTokenPayable(from, value);
  }

    function ()  {
    LogTokenPayable(from, value);
  }

  
}
