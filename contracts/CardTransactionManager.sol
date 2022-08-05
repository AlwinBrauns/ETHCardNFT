//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './CardTransaction.sol';

contract CardTransactionManager {
    event NewTransaction(address sender, address receiver, CardTransaction transaction);
    CardTransaction[] cardTransactions;
    mapping(Card => uint256) senderToCardId;
    mapping(Card => uint256) receiverToCardId;

}