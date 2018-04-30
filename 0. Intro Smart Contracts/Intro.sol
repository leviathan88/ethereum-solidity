pragma solidity ^0.4.17;  // specifies the version of Solidity that our code is written with

contract Inbox {  // defines new contract
    string public message;  // storage variable
    
    constructor(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function getMessage() public view returns (string) {
        return message;
    }
}