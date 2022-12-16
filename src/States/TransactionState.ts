import { BigNumber } from "ethers"
import { useReducer } from "react"
import { initialTransactionState, TransactionData, transactionsReducer, TransactionsReducerActions } from "../Reducer/TransactionsReducer"

export default function useTransactions() {
    const [transactionState, transactionDispatch] = useReducer(transactionsReducer, initialTransactionState)

    const addTransaction = (transactionAddress: string, transactionData: TransactionData) => {
        transactionDispatch(
                {
                    type: TransactionsReducerActions.ADD_TRANSACTION, 
                    transactionAddress: BigNumber.from(transactionAddress), 
                    transactioinData: transactionData
                }
            )
    }

    return {
        transactionState: transactionState,
        transactionDispatch: transactionDispatch,
        addTransaction: addTransaction
    }
}