//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './CardsFactory.sol';

contract Card {
    CardsFactory factory;
    uint card;

    constructor(uint256 _card, CardsFactory _factory) {
        card = _card;
        factory = _factory;
    }

    modifier isOwnerOfCard(address _address) {
        require(factory.isOwnerOfCard(this, _address));
        _;
    }

    function getCard() public view returns(uint256) {
        return card;
    }

    function getFactory() public view returns(CardsFactory) {
        return factory;
    }

    function giveCardValue() payable public isOwnerOfCard(msg.sender) {}

    function getCardValue() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public isOwnerOfCard(msg.sender) {
        payable(msg.sender).transfer(address(this).balance);
    }

}