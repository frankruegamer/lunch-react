import Embedded from "./Embedded";
import Linkable from "./Linkable";
import Links from "./Links";
import Page from "./Page";
import PagingLinks from "./PagingLinks";

interface HalObject<T> {
    _embedded: Embedded<T>;
    _links: PagingLinks;
    page: Page;
}

export default class Hal<T extends Linkable<Links>> {

    private json: HalObject<T>;

    constructor(json: HalObject<T>) {
        this.json = json;
        this.objects = this.objects.map(o => extend(o, new Linkable()));
    }

    get page(): Page {
        return this.json.page;
    }

    set objects(value: T[]) {
        const firstKey = Object.keys(this.json._embedded)[0];
        this.json._embedded[firstKey] = value;
    }

    get objects(): T[] {
        return Object.values(this.json._embedded)[0];
    }

}

export function extend<T, U>(obj: T, extension: U) {
    Object.keys(obj).forEach((key) => {
        // @ts-ignore
        extension[key] = obj[key];
    });
    return extension as T & U;
}
