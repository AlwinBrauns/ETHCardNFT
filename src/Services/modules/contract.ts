import { ethers } from "ethers"

export default class Contract {
    address: string = ""
    abi: any = null
    provider?: ethers.providers.Web3Provider
    signer?: ethers.providers.JsonRpcSigner
    contract?: ethers.Contract
    constructor(address: string, abi: any) {
        this.address = address
        this.abi = abi
        this.updateState(abi)
    }    
    updateState(abi: any, address?: string) {
        if(window.ethereum) {
            // @ts-ignore
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.provider.getSigner()
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