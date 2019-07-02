import Link from "./Link";

export default interface Links {
    [key: string]: Link | undefined
    self: Link
}