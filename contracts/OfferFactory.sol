//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Offer.sol";

contract OfferFactory {
    event NewOffer(Offer offer);
    Offer[] offers;

    mapping(address => uint256) ownerToCounterOffers;
    mapping(uint256 => address) offerIdToOwner;

    function createOffer(
        Card _offerCard,
        string memory _description,
        uint256 _neededWei,
        bool _online,
        uint256 _stock
    ) external {
        Offer offer = new Offer(
            _offerCard,
            _description,
            _neededWei,
            _online,
            _stock
        );
        offer.transferOwnership(msg.sender);
        offers.push(offer);
        uint offerId = offers.length - 1;
        offerIdToOwner[offerId] = msg.sender;
        ownerToCounterOffers[msg.sender] = ownerToCounterOffers[msg.sender] + 1;
        emit NewOffer(offers[offerId]);
    }
}