import { BigNumber } from "ethers";
import { useReducer } from "react";
import { initialOffersState, OfferData, offersReducer, OffersReducerActions } from "../Reducer/OffersReducer";

export default function useOffers() {
    const [offersState, offersDispatch] = useReducer(offersReducer, initialOffersState)

    const addOffer = (offerAddress: BigNumber, offerData: OfferData) => {
        offersDispatch(
                {
                    type: OffersReducerActions.ADD_OFFER, 
                    offerAddress: offerAddress, 
                    offerData: offerData
                }
            )
    }

    return {
        offersState: offersState,
        offersDispatch: offersDispatch,
        addOffer: addOffer
    }
}