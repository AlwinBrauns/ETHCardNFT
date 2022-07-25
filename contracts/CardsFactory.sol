//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Card.sol';

contract CardsFactory {
    event newCard(Card card, address owner); 
    Card[] public cards;
    mapping (uint=>address) public cardIdToUser;
    mapping (uint=>Card) public cardIdToCardContract;
    mapping (address=>uint) public userToCardsCount;
    uint private nonce;

    constructor(){
        nonce = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function generateCard() payable external {
        uint card = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce++)));
        Card cardAddress = new Card(card, this);
        cards.push(cardAddress);
        uint cardId = cards.length - 1;
        cardIdToUser[cardId] = msg.sender;
        userToCardsCount[msg.sender] = userToCardsCount[msg.sender] + 1;
        emit newCard(cards[cardId], msg.sender);
    }

    function getCardsByOwner(address user) public view returns(Card[] memory _cards) {
        Card[] memory result = new Card[](userToCardsCount[user]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cardIdToUser[i] == user) {
                result[counter] = cards[i];
                counter++;
            }
        }
        return result;
    }

    function getOwnCards() public view returns(Card[] memory _cards) {
        return getCardsByOwner(msg.sender);
    }

    function getCards() external view returns(Card[] memory _cards) {
        return cards;
    }

    function getCardCountByOwner(address user) external view returns(uint) {
        return userToCardsCount[user];
    }

    function isOwnerOfCard(Card _card, address _address) public view returns(bool) {
        int cardId = -1;
        for (uint256 i = 0; i < cards.length; i++) {
            if(cards[i] == _card) {
                require(int(i) >= 0);
                cardId = int(i);
                break;
            }
        }
        require(cardId >= 0);
        return cardIdToUser[uint256(cardId)] == _address;
    }

}