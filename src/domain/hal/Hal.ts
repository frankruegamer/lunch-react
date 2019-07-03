import Page from "./Page";
import PagingLinks from "./PagingLinks";
import Embedded from "./Embedded";
import Linkable from "./Linkable";

type HalObject<T> = {
    _embedded: Embedded<T>
    _links: PagingLinks
    page: Page
};

export default class Hal<T extends Linkable> {

    private json: HalObject<T>;

    constructor(json: HalObject<T>) {
        this.json = json;
        this.objects = this.objects.map(o => new Linkable(o) as T);
    }

    get page(): Page {
        return this.json.page;
    }

    set objects(value: T[]) {
        Object.values(this.json._embedded)[0] = value;
    }

    get objects(): T[] {
        return Object.values(this.json._embedded)[0]
    }

}