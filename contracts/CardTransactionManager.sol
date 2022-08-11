//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './CardTransaction.sol';

contract CardTransactionManager {
    event NewTransaction(Card sender, Card receiver, CardTransaction transaction);
    CardTransaction[] cardTransactions;

    mapping(Card => uint256) cardToCountTransaction;

    function createNewTransaction(Card _sender, Card _receiver, uint256 _neededWei, string memory _message) 
    public returns(CardTransaction) {
        CardTransaction transaction = new CardTransaction(_sender, _receiver, _neededWei, _message);
        cardTransactions.push(transaction);
        cardToCountTransaction[_sender]++;
        cardToCountTransaction[_receiver]++;
        emit NewTransaction(_sender, _receiver, transaction);
        return transaction;
    }

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