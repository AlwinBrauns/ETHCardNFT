interface CardProperties {
    key?: number
    id: string,
    text: string
    onClick: Function
    onDelete?: Function
    className?: string
}
export default CardProperties