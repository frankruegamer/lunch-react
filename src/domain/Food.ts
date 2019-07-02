import Linkable from "./hal/Linkable";

export default interface Food extends Linkable {
    number: string
    name: string
    description: string
    price: number
}
