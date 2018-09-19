pragma solidity ^0.4.24;

 /*
 * Contract that is working with ERC223 tokens
 */
 
contract ContractReceiver {
    event LogTokenPayable(uint i, address sender, uint value);

    address public from;
    uint public value; 
     // The token being work
    BetaToken public token = 0x75adF0565e955eD1df172bAea4EdFe120b1bE9Bb;
    
    function tokenFallback(address _from, uint _value, bytes _data) public  returns(bool) {
        from = _from;
        value = _value;
        if (!address(this).delegatecall(_data)) return false;

        return true;  
    }

    function foo() public {
        token.transfer(from, value);
        emit LogTokenPayable(0, from, value);
    }

    function () public {
        emit LogTokenPayable(1, from, value);
   
    }

}
