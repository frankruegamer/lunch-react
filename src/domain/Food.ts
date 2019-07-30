import Link from "./hal/Link";
import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

interface FoodLinks extends Links {
    food: Link;
    restaurant: Link;
}

export default interface Food extends Linkable<FoodLinks> {
    number: string | null;
    name: string;
    description: string;
    price: number;
}
