import address from '../address.json'
import CardsTransactionManagerSol from "../artifacts/contracts/CardTransactionManager.sol/CardTransactionManager.json"
import Contract from './modules/contract'

class _CardsTransactionManager extends Contract {
    //Manager
    async createNewTransaction(sender: string, receiver: string,  neededWei: number, message: string) {
        if(this.updateState(CardsTransactionManagerSol.abi, this.address).success && this.contract) {
            const transaction = await this.contract.createNewTransaction(
                sender, receiver, neededWei, message, sender
            )
            await transaction.wait()
            console.log(transaction)
            return transaction
        }
    }

    //Transaction
}

const CardsTransactionManager: _CardsTransactionManager = new _CardsTransactionManager(address.transactions)

export { 
    CardsTransactionManager
}