import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

export default interface Restaurant extends Linkable<Links> {
    name: string
}