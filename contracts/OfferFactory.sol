//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Offer.sol";

contract OfferFactory {
    event NewOffer(Offer offer);
    Offer[] offers;

    mapping(address => uint256) ownerToCounterOffers;
    mapping(uint256 => address) offerIdToOwner;

    
}