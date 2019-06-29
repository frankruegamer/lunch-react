import BackendService from "./BackendService";

function getAll() {
    return BackendService.getCollection('foods');
}

function getAllPaginated(page) {
    const params = {
        page: page - 1,
        size: 10
    };
    return BackendService.getPaginatedCollection("foods", params);
}


export default class FoodService {

    static getAll(page) {
        if (page !== undefined) {
            return getAllPaginated(page);
        } else {
            return getAll();
        }
    }

    static getFromRegex(regex, page) {
        const params = {
            page: page - 1,
            size: 10,
            regex: regex,
            restaurant: '/1'
        };
        return BackendService.getPaginatedCollection("foods/search/findByNameRegex", params)
    }

}