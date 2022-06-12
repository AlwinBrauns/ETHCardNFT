import React from "react"

class PulseAnimation {
    static start(element: HTMLElement, e: MouseEvent, window: boolean = false) {
        e.stopPropagation()
        element.classList.add("pulse")
        if(window) {
            element.classList.add("pulse-alt")
        }
        let posX = window?e.clientX:e.offsetX
        let posY = window?e.clientY:e.offsetY
        element?.style.setProperty("--y", `${posY}px`)
        element?.style.setProperty("--x", `${posX}px`)
    }
    static stop(element: HTMLElement) {
        if (element?.classList.contains("pulse")) {
            element?.classList.remove("pulse")
            element?.style.setProperty("--y", null)
            element?.style.setProperty("--x", null)
            if(window) {
                element.classList.remove("pulse-alt")
            }
        }
    }
}

export default PulseAnimation