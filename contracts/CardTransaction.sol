//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Card.sol';

contract CardTransaction {
    Card private sender;
    Card private receiver;
    bool private approved;
    bool private discarded;
    uint256 private neededWei;
    string message;

    constructor (Card _sender, Card _receiver, uint256 _neededWei, string memory _message) {
        sender = _sender;
        receiver = _receiver;
        neededWei = _neededWei;
        message = _message;
    }

    modifier isApproved() {
        require(approved);
        _;
    }

    modifier isDiscarded() {
        require(discarded);
        _;
    }

    modifier neededWeiReached() {
        require(address(this).balance >= neededWei);
        _;
    }

    modifier isSender() {
        require(msg.sender == address(sender));
        _;
    }

    modifier isReceiver() {
        require(msg.sender == address(receiver));
        _;
    }

    modifier isSenderOrReceiver() {
        require(msg.sender == address(sender) || msg.sender == address(receiver));
        _;
    }

    modifier noSender() {
        require(sender == Card(address(0)));
        _;
    }

    function addValue() payable public isSender() {}

    function discard() public isSenderOrReceiver() {
        discarded = true;
    }

    function widthdraw() public isReceiver() isApproved() {
        payable(msg.sender).transfer(address(this).balance);
    }

    function payback() public isSender() isDiscarded() {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getIsApproved() public view returns(bool) {
        return approved;
    }

    function getIsDiscarded() public view returns(bool) {
        return discarded;
    }
}