//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cards {
    event newCard(uint card, address owner); 
    mapping (address=>uint[]) public userToCards;
    uint private nonce;

    constructor(){
        nonce = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function generateCard() payable external {
        uint card = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce++)));
        userToCards[msg.sender].push(card);
        emit newCard(userToCards[msg.sender][userToCards[msg.sender].length-1], msg.sender);
    }

    function getCardsByAddress(address _address) external view returns(uint[] memory) {
        return userToCards[_address];
    }

    function getOwnCards() external view returns(uint[] memory) {
        return userToCards[msg.sender];
    }
}