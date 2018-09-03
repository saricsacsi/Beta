pragma solidity ^0.4.9;

 /* ERC223 contract interface */
 
contract ERC223 {
  
  function transfer(address to, uint value, bytes data) public returns (bool ok);
   
  event Transfer(address indexed from, address indexed to, uint value, bytes indexed data);
}
