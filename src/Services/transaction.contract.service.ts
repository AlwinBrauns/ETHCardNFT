import address from '../address.json'
import CardsTransactionManagerSol from "../artifacts/contracts/CardTransactionManager.sol/CardTransactionManager.json"

import { ethers } from "ethers"
import CardProperties from '../Components/Card/CardProperties'

 //TODO: abstract basic contract functions
class _CardsTransactionManager {
    static instance?: _CardsTransactionManager
    static getInstance() {
        if(_CardsTransactionManager.instance) {
            return _CardsTransactionManager.instance
        }
        _CardsTransactionManager.instance = new _CardsTransactionManager()
        return _CardsTransactionManager.instance
    }

    cardsAddress = address.transactionManager
    provider?: ethers.providers.Web3Provider
    signer?: ethers.providers.JsonRpcSigner
    contract?: ethers.Contract

    constructor() {
        this.updateState(CardsTransactionManagerSol.abi)
    }    
    updateState(abi: any, address?: string) {
        if(window.ethereum) {
            // @ts-ignore
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.provider.getSigner()
            this.contract = new ethers.Contract(address?address:this.cardsAddress, abi, this.signer)
            return {
                success: !!(this.contract && this.signer && this.provider)
            }
        }else {
            return {
                success: false
            }
        }
    }
    async createNewTransaction(sender: string, receiver: string,  neededWei: number, message: string) {
        if(this.updateState(CardsTransactionManagerSol.abi, address.transactionManager).success && this.contract) {
            const transaction = await this.contract.createNewTransaction(
                sender, receiver, neededWei, message
            )
            await transaction.wait()
            console.log(transaction)
            return transaction
        }
    }

}

const CardsTransactionManager = _CardsTransactionManager.getInstance()

export { 
    CardsTransactionManager
}