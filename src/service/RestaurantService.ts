import Order from "../domain/Order";
import Restaurant from "../domain/Restaurant";
import BackendService from "./BackendService";

export default class RestaurantService {

    static getAll(): Promise<Restaurant[]> {
        return BackendService.getCollection("restaurants");
    }

    static getFromOrder(order: Order): Promise<Restaurant> {
        return BackendService.get(order.links.restaurant);
    }

}
