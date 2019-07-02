import Links from "./Links";
import Link from "./Link";

export default interface PagingLinks extends Links {
    [key: string]: Link | undefined
    first?: Link
    prev?: Link
    next?: Link
    last?: Link
}