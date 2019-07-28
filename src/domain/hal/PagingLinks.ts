import Link from "./Link";
import Links from "./Links";

export default interface PagingLinks extends Links {
    first?: Link;
    prev?: Link;
    next?: Link;
    last?: Link;
}
