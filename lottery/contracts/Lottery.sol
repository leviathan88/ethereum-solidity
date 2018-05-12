pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        require(msg.sender == manager);
        uint256 index = random() % players.length;
        address myAddress = this;
        players[index].transfer(myAddress.balance);
        players = new address[](0);
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}