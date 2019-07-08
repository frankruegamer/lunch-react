import Linkable from "./hal/Linkable";
import Links from "./hal/Links";

export default interface Order extends Linkable<Links> {
    timestamp: Date
}
