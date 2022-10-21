import { BigNumber } from "ethers"

export enum OffersReducerActions {
    ADD_OFFER = "ADD_OFFER",
    REMOVE_OFFER = "REMOVE_OFFER",
    REMOVE_ALL_OFFERS = "REMOVE_ALL_OFFERS",
    SET_SELECTED_OFFER = "SET_SELECTED_OFFER",
    SET_LATEST_OFFER = "SET_LATEST_OFFER",
}

export type OffersReducerAction = {
    type: string
    offerAddress?: BigNumber
    offerData?: OfferData
}

export type OfferData = {
    offerCard: BigNumber
    description: string
    neededWei: number
    online: boolean
    stock: number
    rating: number
    ratingCounter: number
}

export interface Offer extends OfferData {
    id: string
}

export type OffersReducerState = {
    offers: Offer[]
    latestOffer: string,
    selectedOffer: number,
}

export const initialOffersState: OffersReducerState = {
    offers: [],
    latestOffer: "",
    selectedOffer: 0,
}

export function offersReducer (state: OffersReducerState, action: OffersReducerAction): OffersReducerState{
    switch (action.type) {
        case OffersReducerActions.ADD_OFFER: 
            if (!action.offerData || !action.offerAddress) throw new Error("missing action arguments")
            let offersWithAddedOffer: Offer[] = state.offers
            const uniqueID = action.offerAddress._hex
            const newOffer: Offer = {
                id: uniqueID,
                offerCard: action.offerData.offerCard,
                description: action.offerData.description,
                neededWei: action.offerData.neededWei,
                online: action.offerData.online,
                stock: action.offerData.stock,
                rating: action.offerData.rating,
                ratingCounter: action.offerData.ratingCounter
            }
            if (!state.offers.map((elem) => elem.id).includes(uniqueID)) {
                offersWithAddedOffer = [...offersWithAddedOffer, newOffer]
              }
            return {...state, offers: offersWithAddedOffer}
        default:
            throw new Error()
    }
}