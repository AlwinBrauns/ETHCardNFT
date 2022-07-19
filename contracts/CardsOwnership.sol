//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Cards.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract CardsOwnership is Cards, ERC721 {

    mapping (uint256 => address) cardsApproval;

    constructor() ERC721("CardsNFT", "CRN") {}

    modifier isAddressesToken(address _addr, uint256 _tokenId) {
        require(cardIdToUser[_tokenId] == _addr);
        _;
    }

    modifier isApprovedAddress(address _addr, uint256 _tokenId) {
        require(cardsApproval[_tokenId] == _addr);
        _;
    }

    modifier isApprovedOrAddressesToken(address _from, address _to, uint256 _tokenId) {
        require(cardsApproval[_tokenId] == _to || cardIdToUser[_tokenId] == _from);
        _;
    }

    modifier isOwnerOf(uint256 _tokenId) {
        require(cardIdToUser[_tokenId] == msg.sender);
        _;
    }

    function balanceOf(address _owner) public override view returns(uint256) {
        return uint(userToCardsCount[_owner]);
    }
    
    function ownerOf(uint256 _tokenId) public override view returns(address) {
        return cardIdToUser[_tokenId];
    }

    function _transfer(address _from, address _to, uint256  _tokenId) 
    internal override 
    isApprovedOrAddressesToken(_from, _to, _tokenId)
    {
        cardIdToUser[_tokenId] = _to;
        userToCardsCount[_from] = userToCardsCount[_from] - 1;
        userToCardsCount[_to] = userToCardsCount[_to] + 1;
        emit Transfer(_from, _to, _tokenId);
    }
    
    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public override isOwnerOf(_tokenId) {
        cardsApproval[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }
}