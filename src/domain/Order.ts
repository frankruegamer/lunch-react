import Linkable from "./hal/Linkable";
import Links from "./hal/Links";
import Link from "./hal/Link";

interface OrderLinks extends Links {
    restaurant: Link
}

export default interface Order extends Linkable<Links> {
    timestamp: Date
}
