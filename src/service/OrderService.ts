import BackendService from "./BackendService";
import Order from "../domain/Order";

export default class OrderService {

    static getLast10(): Promise<Order[]> {
        return BackendService.getCollection<Order>("orders/search/last10")
    }

}