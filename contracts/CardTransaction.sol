//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Card.sol';
import './Offer.sol';

contract CardTransaction {
    Card private sender;
    Card private receiver;
    address private creater;
    bool private approved;
    bool private discarded;
    uint256 private neededWei;
    string message;
    bool private completed;

    constructor (Card _sender, Card _receiver, uint256 _neededWei, string memory _message, address _creater) {
        require(_receiver != _sender, "Cannot transfer to yourself");
        require(address(_receiver) != address(0), "Cannot transfer to the null address");
        sender = _sender;
        receiver = _receiver;
        neededWei = _neededWei;
        message = _message;
        creater = _creater;
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

    modifier notCompleted() {
        require(completed==false);
        _;
    }

    function setSender() public noSender() {
        sender = Card(msg.sender);
    }

    function addValue() payable public isSender() {}

    function discard() public isSenderOrReceiver() {
        discarded = true;
        approved = false;
    }

    function widthdraw() public isReceiver() isApproved() neededWeiReached() notCompleted() {
        payable(msg.sender).transfer(address(this).balance);
        completed = true;
    }

    function payback() public isSender() isDiscarded() {
        payable(msg.sender).transfer(address(this).balance);
    }

    function approve() public isSender() {
        approved = true;
    }

    function getIsApproved() public view returns(bool) {
        return approved;
    }

    function getIsDiscarded() public view returns(bool) {
        return discarded;
    }

    function getSender() public view returns(Card) {
        return sender;
    }
    
    function getReceiver() public view returns(Card) {
        return receiver;
    }

    function getCreater() public view returns(address) {
        return creater;
    }
}