//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Card.sol";
import "./CardTransaction.sol";
import "./CardTransactionManager.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract Offer is Ownable{
    CardTransactionManager private cardTransactionManager;
    Card private offerCard;
    string private description;
    uint256 private neededWei;
    bool private online;
    uint256 private stock;
    uint8 private rating;
    uint256 private ratingCounter;

    constructor(
        CardTransactionManager _cardTransactionManager,
        Card _offerCard,
        string memory _description,
        uint256 _neededWei,
        bool _online,
        uint256 _stock
        ) Ownable(){
            cardTransactionManager = _cardTransactionManager;
            offerCard = _offerCard;
            description = _description;
            neededWei = _neededWei;
            online = _online;
            stock = _stock;
    }

    function buy(Card sender, uint256 expectedWei, string memory message) external returns(CardTransaction) {
        require(stock>0);
        require(neededWei==expectedWei);
        require(online);
        stock--;
        return cardTransactionManager.createNewTransaction(sender, offerCard, neededWei, message, address(this));
    }

    function changeOfferCard(Card _offerCard) external onlyOwner() {
        offerCard = _offerCard;
    }

    function changeDescription(string memory _description) external onlyOwner() {
        description = _description;
    }

    function changeNeededWei(uint256 _neededWei) external onlyOwner() {
        neededWei = _neededWei;
    }

    function setOnline(bool _online) external onlyOwner() {
        online = _online;
    }

    function changeStock(uint256 _stock) external onlyOwner() {
        stock = _stock;
    }

    function getOfferCard() public view returns(Card){
        return offerCard;
    }

    function getDescription() public view returns(string memory){
        return description;
    }

    function getNeededWei() public view returns(uint256){
        return neededWei;
    }

    function isOnline() public view returns(bool) {
        return online;
    }

    function getRating() public view returns(uint8) {
        return rating;
    }

    function getRatingCounter() public view returns(uint256) {
        return ratingCounter;
    }
}