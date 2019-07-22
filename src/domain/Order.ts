import Link from "./hal/Link";
import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

interface OrderLinks extends Links {
    restaurant: Link;
}

export default interface Order extends Linkable<Links> {
    timestamp: Date;
}
