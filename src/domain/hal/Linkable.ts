import Links from "./Links";

export default class Linkable {
    private _links?: Links;

    get links(): Links | undefined {
        return this._links;
    }

}