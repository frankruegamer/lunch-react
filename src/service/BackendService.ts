import URI from 'urijs';
import Hal from "../domain/hal/Hal";

interface Parameters {
    [key: string]: string | number | undefined

    page?: number
    size?: number
    sort?: string
}

export default class BackendService {

    static baseURL = 'http://localhost:8080/api/';

    static getCollection<T>(path: string): Promise<T[]> {
        return fetch(BackendService.baseURL + path)
            .then(response => response.json())
            .then(data => data._embedded)
            .then(embedded => Object.values(embedded)[0] as T[])
    }

    static getPaginatedCollection<T>(path: string, params: Parameters = {}): Promise<Hal<T>> {
        const uri = URI(BackendService.baseURL)
            .path(URI.joinPaths(BackendService.baseURL, path).path())
            .query(params);
        return fetch(uri.valueOf())
            .then(response => response.json())
            .then(json => new Hal(json))
    }

    static testConnection() {
        return fetch(BackendService.baseURL)
            .then(() => true)
            .catch(() => false)
    }

}