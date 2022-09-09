import { ethers } from "ethers"

export default class Contract {
    address: string = ""
    provider?: ethers.providers.Web3Provider
    signer?: ethers.providers.JsonRpcSigner
    contract?: ethers.Contract
    constructor(address: string) {
        this.address = address
    }    
    updateState(abi: any, address?: string, signer?: string) {
        if(window.ethereum) {
            // @ts-ignore
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = 
            (
                signer?
                this.provider.getSigner(signer)
                :
                this.provider.getSigner()
            )
            this.contract = new ethers.Contract(address?address:this.address, abi, this.signer)
            return {
                success: !!(this.contract && this.signer && this.provider)
            }
        }else {
            return {
                success: false
            }
        }
    }
}