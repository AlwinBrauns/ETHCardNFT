//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './CardTransaction.sol';

contract CardTransactionManager {
    event NewTransaction(address sender, address receiver, CardTransaction transaction);
    CardTransaction[] cardTransactions;

    mapping(Card => uint256) cardToCountTransaction;

    function getTransactionsBySender(Card _sender) public view returns(CardTransaction[] memory _cards) {
        CardTransaction[] memory result = new CardTransaction[](cardToCountTransaction[_sender]);
        for (uint i = 0; i < _cards.length; i++) {
            if (cardTransactions[i].getSender() == _sender) {
                result[i] =cardTransactions[i];
            }
        }
        return result;
    }

    function getTransactionsByReceiver(Card _receiver) public view returns(CardTransaction[] memory _cards) {
        CardTransaction[] memory result = new CardTransaction[](cardToCountTransaction[_receiver]);
        for (uint i = 0; i < _cards.length; i++) {
            if (cardTransactions[i].getReceiver() == _receiver) {
                result[i] =cardTransactions[i];
            }
        }
        return result;
    }
}