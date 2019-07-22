import Restaurant from "../domain/Restaurant";
import BackendService from "./BackendService";

export default class RestaurantService {

    static getAll(): Promise<Restaurant[]> {
        return BackendService.getCollection<Restaurant>("restaurants");
    }

}
