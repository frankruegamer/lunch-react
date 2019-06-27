import URI from 'urijs';

export default class BackendService {
    static baseURL = 'http://localhost:8080/api/';

    static getCollection(path) {
        return fetch(BackendService.baseURL + path)
            .then(response => response.json())
            .then(data => data._embedded)
            .then(embedded => Object.values(embedded)[0])
    }

    static getPaginatedCollection(path, page, size) {
        const uri = URI(BackendService.baseURL)
            .path(URI.joinPaths(BackendService.baseURL, path))
            .query({
                'page': page,
                'size': size
            });
        return fetch(uri)
            .then(response => response.json())
    }

    static testConnection() {
        return fetch(BackendService.baseURL)
            .then(() => true)
            .catch(() => false)
    }

}