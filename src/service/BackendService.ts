import URI from "urijs";
import Hal from "../domain/hal/Hal";
import Link from "../domain/hal/Link";
import Linkable from "../domain/hal/Linkable";
import Links from "../domain/hal/Links";

interface Parameters {
    page?: number;
    size?: number;
    sort?: string;

    [key: string]: string | number | undefined;
}

interface Body {
    [key: string]: string | boolean;
}

export default class BackendService {

    private static baseURL = "http://localhost:8080/api/";

    static get<T extends Linkable<Links>>(link: Link, params: Parameters = {}, signal?: AbortSignal): Promise<T> {
        return fetch(BackendService.getUrl(link, params).valueOf(), {signal})
            .then(async response => {
                if (response.ok) {
                    return Object.assign(new Linkable(), await response.json());
                } else {
                    throw new Error(response.statusText);
                }
            });
    }

    static getCollection<T extends Linkable<Links>>(path: string | Link, params: Parameters = {}): Promise<T[]> {
        return fetch(BackendService.getUrl(path, params).valueOf())
            .then(async response => response.ok ? new Hal<T>(await response.json()).objects : []);
    }

    static async getAllFromPaginatedCollection<T extends Linkable<Links>>(path: string,
                                                                          params: Parameters = {}): Promise<T[]> {
        const hal = await this.getPaginatedCollection<T>(path, params);
        const promises: Array<Promise<Hal<T>>> = [];
        for (let i = 1; i < hal.page.totalPages; i++) {
            const promise = this.getPaginatedCollection<T>(path, {...params, page: i});
            promises.push(promise);
        }
        const responses = await Promise.all(promises);
        const results: T[] = hal.objects;
        responses.forEach(result => results.push(...result.objects));
        return results;
    }

    static getPaginatedCollection<T extends Linkable<Links>>(path: string, params: Parameters = {}): Promise<Hal<T>> {
        return fetch(BackendService.getUrl(path, params).valueOf())
            .then(response => response.json())
            .then(json => new Hal(json));
    }

    static post<T extends Linkable<Links>>(path: string, body: Body = {}): Promise<T> {
        return fetch(BackendService.getUrl(path).valueOf(), {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        }).then(response => response.json())
          .then(json => Object.assign(new Linkable(), json));
    }

    static delete(link: Link): Promise<Response> {
        return fetch(BackendService.getUrl(link).valueOf(), {
            method: "DELETE"
        });
    }

    static patch<T extends Linkable<Links>>(link: Link, body: Body = {}): Promise<T> {
        return fetch(BackendService.getUrl(link).valueOf(), {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
        }).then(response => response.json())
          .then(json => Object.assign(new Linkable(), json));
    }

    static testConnection() {
        return fetch(BackendService.baseURL)
            .then(() => true)
            .catch(() => false);
    }

    private static getUrl(path: string | Link, params?: Parameters): uri.URI {
        let uri;
        if (typeof path === "string") {
            uri = URI(BackendService.baseURL)
                .path(URI.joinPaths(BackendService.baseURL, path).path());
        } else {
            uri = URI(path.href);
        }
        return params === undefined ? uri : uri.query(params);
    }

}
