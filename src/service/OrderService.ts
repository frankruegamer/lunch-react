import Order from "../domain/Order";
import BackendService from "./BackendService";

export default class OrderService {

    static getLast10(): Promise<Order[]> {
        return BackendService.getCollection<Order>("orders/search/last10");
    }

}
