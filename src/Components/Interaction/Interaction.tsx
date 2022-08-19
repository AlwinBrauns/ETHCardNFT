import { ReactNode } from "react"
import "./Interaction.scss"

type InteractionProps = {
    changed: boolean,
    setChanged: Function,
    children: ReactNode
}
export default function Interaction({changed, setChanged, children}: InteractionProps) {
    return (
        <div 
                className={"Interaction " + (changed?"changed":"")} 
                onTransitionEnd={(event: React.TransitionEvent) => {
                    if(event.elapsedTime > 0.2 && event.propertyName === "top") setChanged(false)
                }}
            >
                {
                    children
                }
        </div>
    )
}