import Page from "./Page";

type bloatedLinks = { [key: string]: { href: string } };
type Links = { [key: string]: string };

interface P<T> {
    _embedded: { [key: string]: T[] }
    _links: bloatedLinks
    page: Page
}

export default class Pageable<T> {
    objects: T[];
    links: Links;
    page: Page;

    constructor(response: P<T>) {
        this.objects = Object.values(response._embedded)[0];
        this.links = flatten(response._links);
        this.page = response.page;
    }
}

function flatten(links: bloatedLinks): Links {
    return Object.keys(links).reduce((previousValue: Links, currentValue: string): Links => {
        previousValue[currentValue] = links[currentValue].href;
        return previousValue;
    }, {})
}