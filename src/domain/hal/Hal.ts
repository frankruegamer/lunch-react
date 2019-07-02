import Page from "./Page";
import PagingLinks from "./PagingLinks";
import Embedded from "./Embedded";

type HalObject<T> = {
    _embedded: Embedded<T>
    _links: PagingLinks
    page: Page
};

export default class Hal<T> {

    private json: HalObject<T>;

    constructor(json: HalObject<T>) {
        this.json = json;
    }

    get page(): Page {
        return this.json.page;
    }

    get objects(): T[] {
        return Object.values(this.json._embedded)[0]
    }

}