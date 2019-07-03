import Links from "./Links";

export default class Linkable {
    private readonly _links: Links;

    constructor(links: Linkable) {
        this._links = links._links;
    }

    get links(): Links {
        return this._links;
    }

}