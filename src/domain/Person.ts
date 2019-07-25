import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

export default interface Person extends Linkable<Links> {
    name: string;
}
