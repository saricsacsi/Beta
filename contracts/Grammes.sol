pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract Grammes is MintableToken {
    string public constant name = "Grammes";
    string public constant symbol = "GRM";
    uint8 public constant decimals = 0;
}