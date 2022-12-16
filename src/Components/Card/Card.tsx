import CardProperties from "./CardProperties"
import React, { useRef } from "react"
import PulseAnimation from "../../Animations/PulseAnimation"
import './Card.scss'
import ColorService from "../../Services/uiServices/color.service"

function Card ({text, onClick, onDelete, id, cardAddress, classAddition}: CardProperties) {
    const ref = useRef<HTMLDivElement>(null)
    const bgColor = ColorService.bgColor(id)
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
        backgroundColor: `rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue})`,
    }} ref={ref} className={"Card " + classAddition} onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
        <small style={{color: ColorService.highContrastColor(bgColor),}}>Card: {id.substring(0, 3)}...</small>
        <small style={{color: ColorService.highContrastColor(bgColor),}}>Address: {cardAddress.substring(0, 3)}...</small>
        {onDelete ? <button className="close" onClick={handleDelete}>Hide</button>: null}
    </div>
)}

export default Card