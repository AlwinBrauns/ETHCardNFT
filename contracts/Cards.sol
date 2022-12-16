//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

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
        userToCardsCount[msg.sender]++;
        emit newCard(cards[cardId], msg.sender);
    }

    function getOwnCards() external view returns(uint[] memory _cards) {
        uint[] memory result = new uint[](userToCardsCount[msg.sender]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cardIdToUser[i] == msg.sender) {
                result[counter] = cards[i];
                counter++;
            }
        }
        return result;
    }
}