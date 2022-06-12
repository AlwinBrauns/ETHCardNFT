import CardProperties from "./CardProperties"
import React, { useRef } from "react"
import PulseAnimation from "../Animations/PulseAnimation"

function Card ({key, text, onClick, className, onDelete, id}: CardProperties) {
    const ref = useRef<HTMLDivElement>(null)
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(ref.current) {
            PulseAnimation.start(ref.current, e.nativeEvent)
        }
        onClick()
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        if (onDelete) {
        onDelete()
        }
    }
    const handleAnimationEnd = () => {
        if(ref.current) {
            PulseAnimation.stop(ref.current)
        }
    }
    return (
    <div ref={ref} className={className} key={key + id} onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
        <span>{text} <small style={{fontSize: "0.8rem"}}>{id.substring(0, 3)}...</small></span>
        {onDelete ? <button onClick={handleDelete}>Delete</button>: null}
    </div>
)}

export default Card