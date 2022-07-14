//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cards {
    event newCard(uint card, address owner); 
    uint[] public cards;
    mapping (uint=>address) public cardIdToUser;
    mapping (address=>uint) public userToCardsCount;
    uint private nonce;

    constructor(){
        nonce = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function generateCard() payable external {
        uint card = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce++)));
        cards.push(card);
        uint cardId = cards.length - 1;
        cardIdToUser[cardId] = msg.sender;
        userToCardsCount[msg.sender] = userToCardsCount[msg.sender] + 1;
        emit newCard(cards[cardId], msg.sender);
    }

    function getCardsByOwner(address user) external view returns(uint[] memory _cards) {
        uint[] memory result = new uint[](userToCardsCount[user]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cardIdToUser[i] == user) {
                result[counter] = cards[i];
                counter++;
            }
        }
        return result;
    }

    function getCards() external view returns(uint[] memory _cards) {
        return cards;
    }

    function getCardCountByOwner(address user) external view returns(uint) {
        return userToCardsCount[user];
    }


}