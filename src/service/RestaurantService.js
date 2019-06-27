import BackendService from "./BackendService";

export default class RestaurantService {

    static getAll() {
        return BackendService.getCollection("restaurants");
    }

}