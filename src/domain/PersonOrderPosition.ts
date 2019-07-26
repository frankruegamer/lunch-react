import Food from "./Food";
import Link from "./hal/Link";
import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

interface PersonOrderPositionLinks extends Links {
    food: Link;
}

export default interface PersonOrderPosition extends Linkable<PersonOrderPositionLinks> {
    custom: string;
    food: Food;
}
