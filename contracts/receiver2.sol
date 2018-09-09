pragma solidity ^0.4.9;

 /*
 * Contract that is working with ERC223 tokens
 */
 
 contract ContractReceiver {
     event LogTokenPayable(uint i, address sender, uint value);

    address public from;
    uint public value; 
    
    
    function tokenFallback(address _from, uint _value, bytes _data) public  returns(bool) {
    from = _from;
    value = _value;
    if (!address(this).delegatecall(_data)) return false;

    return true;  
    }

    function foo() {
    LogTokenPayable(0, from, value);
  }

    function ()  {
    LogTokenPayable(1, from, value);
   
}

  }
