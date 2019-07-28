import Address from "./Address";
import Link from "./hal/Link";
import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

interface RestaurantLinks extends Links {
    foods: Link;
    orders: Link;
    restaurant: Link;
}

export default interface Restaurant extends Linkable<RestaurantLinks> {
    name: string;
    telephone: string;
    address: Address;
}
