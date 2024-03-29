//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import './CardTransaction.sol';

contract Card is Ownable {
    uint card;

    struct Information {
        string name;
        string postfach;
    }

    Information information;

    constructor(uint256 _card) Ownable() {
        card = _card;
        information = Information("", "");
    }

    function getCard() public view returns(uint256) {
        return card;
    }

    function setName(string memory name) public onlyOwner() {
        information.name = name;
    }

    function setPostfach(string memory _postfach) 
    public onlyOwner() {
        information.postfach = _postfach;
    }

    function giveCardValue() payable public {}

    function getCardValue() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner() {
        payable(msg.sender).transfer(address(this).balance);
    }

    function addValueToTransaction(CardTransaction _transaction, uint256 _wei) public onlyOwner() {
        _transaction.addValue{value: _wei}();
    }

    function approveTransaction(CardTransaction _transaction) public onlyOwner() {
        _transaction.approve();
    }

    function withdrawTransaction(CardTransaction _transaction) public onlyOwner() {
        _transaction.widthdraw();
    }
}