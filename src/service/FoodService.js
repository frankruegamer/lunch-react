import BackendService from "./BackendService";

function getAll() {
    return BackendService.getCollection('foods');
}

function getAllPaginated(page) {
    return BackendService.getPaginatedCollection("foods", page - 1);
}


export default class FoodService {

    static getAll(page) {
        if (page !== undefined) {
            return getAllPaginated(page);
        } else {
            return getAll();
        }
    }

}