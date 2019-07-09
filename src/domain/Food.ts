import Linkable from "./hal/Linkable";
import Links from "./hal/Links";
import Link from "./hal/Link";

interface FoodLinks extends Links {
    food: Link
    restaurant: Link
}

export default interface Food extends Linkable<FoodLinks> {
    number: string
    name: string
    description: string
    price: number
}
