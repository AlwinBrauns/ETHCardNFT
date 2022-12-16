import { BigNumber } from "ethers"

export enum TransactionsReducerActions {
    ADD_TRANSACTION = "ADD_TRANSACTION",
    REMOVE_TRANSACTION = "REMOVE_TRANSACTION",
    REMOVE_ALL_TRANSACTION = "REMOVE_ALL_TRANSACTION",
    SET_SELECTED_TRANSACTION = "SET_SELECTED_TRANSACTION",
    SET_LATEST_TRANSACTION = "SET_LATEST_TRANSACTION",
}

export type TransactionReducerAction = {
    type: string
    transactionAddress?: BigNumber
    transactioinData?: TransactionData
}

export type TransactionData = {
    sender: BigNumber,
    receiver: BigNumber,
    creater: string,
    approved: boolean,
    discarded: boolean,
    neededWei: number,
    message: string,
    completed: boolean
}

export interface TransactionType extends TransactionData {
    id: string
}

export type TransactionReducerState = {
    transactions: TransactionType[]
    latestTransaction: string,
    selectedTransaction: number,
}

export const initialTransactionState: TransactionReducerState = {
    transactions: [],
    latestTransaction: "",
    selectedTransaction: 0,
}

export function transactionsReducer (state: TransactionReducerState, action: TransactionReducerAction): TransactionReducerState{
    switch (action.type) {
        case TransactionsReducerActions.ADD_TRANSACTION: 
            if (!action.transactioinData || !action.transactionAddress) throw new Error("missing action arguments")
            let transactionWithAddedTransaction: TransactionType[] = state.transactions
            const uniqueID = action.transactionAddress._hex
            const newTransaction: TransactionType = {
                id: uniqueID,
                ...action.transactioinData
            }
            if (!state.transactions.map((elem) => elem.id).includes(uniqueID)) {
                transactionWithAddedTransaction = [...transactionWithAddedTransaction, newTransaction]
              }
            return {...state, transactions: transactionWithAddedTransaction}
        default:
            throw new Error()
    }
}

