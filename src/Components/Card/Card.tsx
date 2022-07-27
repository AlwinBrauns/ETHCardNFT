import CardProperties from "./CardProperties"
import React, { useRef } from "react"
import PulseAnimation from "../../Animations/PulseAnimation"
import './Card.scss'

function Card ({text, onClick, onDelete, id, cardAddress}: CardProperties) {
    const ref = useRef<HTMLDivElement>(null)
    const bgColor = {
        red:  Number(id.slice(0,2)+id.slice(2,4)),
        green: Number(id.slice(0,2)+id.slice(4,6)),
        blue: Number(id.slice(0,2)+id.slice(6,8)),
    }
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(ref.current) {
            PulseAnimation.start(ref.current, e.nativeEvent)
        }
        if(onClick){
            onClick()
        }
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
    <div style={{
        backgroundColor: `rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue})`
    }} ref={ref} className={"App-main-card"} onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
        <small style={{fontSize: "0.8rem"}}>Card: {id.substring(0, 3)}...</small>
        <small style={{fontSize: "0.8rem"}}>Address: {cardAddress.substring(0, 3)}...</small>
        {onDelete ? <button className="close" onClick={handleDelete}>Hide</button>: null}
    </div>
)}

export default Card