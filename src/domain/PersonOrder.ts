import Link from "./hal/Link";
import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

interface PersonOrderLinks extends Links {
    personOrder: Link;
    person: Link;
    personOrderPositions: Link;
    restaurantOrder: Link;
}

export default interface PersonOrder extends Linkable<PersonOrderLinks> {
    price: number;
    paid: boolean;
}
