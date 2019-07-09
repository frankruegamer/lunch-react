import Linkable from "./hal/Linkable";
import Links from "./hal/Links";
import Link from "./hal/Link";


interface RestaurantLinks extends Links {
    foods: Link
    orders: Link
    restaurant: Link
}

export default interface Restaurant extends Linkable<RestaurantLinks> {
    name: string
}