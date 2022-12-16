import ColorService from "../../Services/uiServices/color.service"
import "./Transaction.scss"

type TransactionProperties = {
    sender: string,
    receiver: string,
    id: string
}
export default function Transaction({sender, receiver, id}: TransactionProperties) {
    const bgColor = ColorService.bgColor(id)

    return (
        <div className="Transaction" style={{
            backgroundColor: `rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue})`,
        }}>
            <div className="transaction-information">
                <small style={{color: ColorService.highContrastColor(bgColor),}}>Sender: {sender}</small>
                <br></br>
                <small style={{color: ColorService.highContrastColor(bgColor),}}>Receiver: {receiver}</small>
            </div>
        </div>
    )
}