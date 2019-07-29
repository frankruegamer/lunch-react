import Order from "../domain/Order";
import Restaurant from "../domain/Restaurant";
import BackendService from "./BackendService";

export default class OrderService {

    static refresh(order: Order): Promise<Order> {
        return BackendService.get(order.links.self);
    }

    static getLast10(): Promise<Order[]> {
        return BackendService.getCollection<Order>("orders/search/last10")
            .then(orders => orders.map(initializeTimestamp));
    }

    static createNew(restaurant: Restaurant): Promise<Order> {
        const body = {
            restaurant: restaurant.links.self.href
        };
        return BackendService.post<Order>("orders", body)
            .then(initializeTimestamp);
    }

}

function initializeTimestamp(order: Order): Order {
    order.timestamp = new Date(order.timestamp);
    return order;
}
