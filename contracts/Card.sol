//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './CardsFactory.sol';

contract Card{
    CardsFactory private factory;
    uint card;

    struct Information {
        string name;
        string postfach;
    }

    Information information;
    bool postfachSet;


    constructor(uint256 _card, CardsFactory _factory) {
        card = _card;
        factory = _factory;
        information = Information("", "");
        postfachSet = false;
    }

    modifier isOwnerOfCard(address _address) {
        require(factory.isOwnerOfCard(this, _address));
        _;
    }

    modifier isNotSet() {
        require(!postfachSet);
        _;
    }

    function getCard() public view returns(uint256) {
        return card;
    }

    function getFactory() public view returns(CardsFactory) {
        return factory;
    }

    function setName(string memory name) public isOwnerOfCard(msg.sender) {
        information.name = name;
    }

    function setPostfach(string memory _postfach) 
    public isOwnerOfCard(msg.sender) isNotSet() {
        information.postfach = _postfach;
        postfachSet = true;
    }

    function giveCardValue() payable public {}

    function getCardValue() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public isOwnerOfCard(msg.sender) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function transfer() public isOwnerOfCard(msg.sender) {
        //TODO: Implement
    }

}