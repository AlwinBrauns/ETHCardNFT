import { ethers } from "ethers"
import CardProperties from "../Card/CardProperties"

interface AppHeaderProperties {
    cards: CardProperties[], 
    latestCard?: string, 
    latestCardOwner?: string, 
    selectedCard?: number,
}
export default AppHeaderProperties