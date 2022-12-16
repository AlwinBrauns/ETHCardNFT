type BgColor = {
    red: number
    green: number
    blue: number
}
class _ColorService {
    bgColor(id:string): BgColor {
        return {
            red:  Number(id.slice(0,2)+id.slice(2,4)),
            green: Number(id.slice(0,2)+id.slice(4,6)),
            blue: Number(id.slice(0,2)+id.slice(6,8)),
        }
    }
    highContrastColor(bgColor: BgColor) {
        const luminance = (0.2126 * bgColor.red) + (0.7152 * bgColor.green) + (0.0722 * bgColor.blue)
        if (luminance > 128) {
            return '#000000'
        }
        return '#ffffff'
    }
}

const ColorService = new _ColorService();

export default ColorService;