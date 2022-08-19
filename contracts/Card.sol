//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Card is Ownable {
    uint card;

    struct Information {
        string name;
        string postfach;
    }

    Information information;
    bool postfachSet;


    constructor(uint256 _card) Ownable() {
        card = _card;
        information = Information("", "");
        postfachSet = false;
    }

    modifier isNotSet() {
        require(!postfachSet);
        _;
    }

    function getCard() public view returns(uint256) {
        return card;
    }

    function setName(string memory name) public onlyOwner() {
        information.name = name;
    }

    function setPostfach(string memory _postfach) 
    public onlyOwner() isNotSet() {
        information.postfach = _postfach;
        postfachSet = true;
    }

    function giveCardValue() payable public {}

    function getCardValue() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner() {
        payable(msg.sender).transfer(address(this).balance);
    }
}