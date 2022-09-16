import address from '../address.json'
import CardsTransactionManagerSol from "../artifacts/contracts/CardTransactionManager.sol/CardTransactionManager.json"
import Contract from './modules/contract'

class _CardsTransactionManager extends Contract {
    //Manager
    async createNewTransaction(sender: string, receiver: string,  neededWei: string, message: string) {
        if(this.updateState(CardsTransactionManagerSol.abi, this.address).success && this.contract) {
            const transaction = await this.contract.createNewTransaction(
                sender, receiver, neededWei, message, sender
            )
            await transaction.wait()
            console.log(transaction)
            return transaction
        }
    }
    async subscribeToNewTransactionListener(listener: (sender: any, receiver: any, transaction: any)=>void) {
        if(this.updateState(CardsTransactionManagerSol.abi).success && this.contract) {
            this.contract.on("NewTransaction", listener)
        }
    }
    async unsubscribeFromNewTransactionListener(listener: (sender: any, receiver: any, transaction: any)=>void) {
        if(this.updateState(CardsTransactionManagerSol.abi).success && this.contract) {
            this.contract.off("NewTransaction", listener)
        }
    }

    //Transaction
}

const CardsTransactionManager: _CardsTransactionManager = new _CardsTransactionManager(address.transactions)

export { 
    CardsTransactionManager
}