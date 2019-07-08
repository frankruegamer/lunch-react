import Links from "./Links";

export default class Linkable<T extends Links> {
    private readonly _links!: T;

    get links(): T {
        return this._links;
    }

}