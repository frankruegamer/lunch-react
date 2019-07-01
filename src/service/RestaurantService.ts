import BackendService from "./BackendService";
import Restaurant from "../domain/Restaurant";

export default class RestaurantService {

    static getAll(): Promise<Restaurant[]> {
        return BackendService.getCollection<Restaurant>("restaurants");
    }

}