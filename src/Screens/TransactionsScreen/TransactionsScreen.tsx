import { BigNumber } from "ethers"
import { useEffect } from "react"
import FunctionsPanel from "../../Components/FunctionsPanel/FunctionsPanel"
import { CardsTransactionManager } from "../../Services/transaction.contract.service"
import useTransactions from "../../States/TransactionState"
import Transaction from "../../Components/Transaction/Transaction"

export default function TransactionsScreen() {
    const {transactionState,addTransaction} = useTransactions()

    const onNewTransaction = (sender: any, receiver: any, transaction: any) => {
        console.dir({
            sender: sender,
            receiver: receiver,
            transaction: transaction
        })
        addTransaction(transaction, {
            sender: BigNumber.from(sender),
            receiver: BigNumber.from(receiver),
            creater: "",
            approved: false,
            discarded: false,
            neededWei: 0,
            message: "",
            completed: false
        })
    }

    useEffect(() => {
        CardsTransactionManager.subscribeToNewTransactionListener(onNewTransaction)
        return () => {
            CardsTransactionManager.unsubscribeFromNewTransactionListener(onNewTransaction)
        }
    },[])

    return (
        <>
        <FunctionsPanel>
            <button>WIP</button>
        </FunctionsPanel>
            <div>
                {
                    transactionState.transactions.map(
                        trx => <Transaction sender={trx.sender.toHexString()} receiver={trx.receiver.toHexString()} id={trx.id} />
                    )
                }
            </div>
        </>
    )
}