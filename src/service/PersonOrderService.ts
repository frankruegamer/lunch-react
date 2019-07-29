import OrderSummaryItem from "../components/overview/OrderSummaryItem";
import Food from "../domain/Food";
import Order from "../domain/Order";
import Person from "../domain/Person";
import PersonOrder from "../domain/PersonOrder";
import PersonOrderPosition from "../domain/PersonOrderPosition";
import BackendService from "./BackendService";
import FoodService from "./FoodService";

interface CreateOrderParameters {
    order: Order;
    personOrder?: PersonOrder;
    person: Person;
}

export default class PersonOrderService {

    static getPersonOrders(order: Order): Promise<PersonOrder[]> {
        return BackendService.getCollection(order.links.personOrders);
    }

    static getByPerson(order: Order, person: Person): Promise<PersonOrder> {
        return BackendService.get(order.links.personOrders, {name: person.name});
    }

    static getPositions(personOrder: PersonOrder): Promise<PersonOrderPosition[]> {
        return BackendService.getCollection<PersonOrderPosition>(personOrder.links.personOrderPositions)
            .then(PersonOrderService.fetchFood);
    }

    static deletePosition(position: PersonOrderPosition) {
        return BackendService.delete(position.links.self);
    }

    static async createPersonOrder(food: Food, params: CreateOrderParameters): Promise<PersonOrderPosition> {
        const {personOrder, order, person} = params;
        let newOrder;
        if (personOrder !== undefined) {
            newOrder = personOrder;
        } else {
            const orderBody = {person: person.links.self.href, restaurantOrder: order.links.self.href};
            newOrder = await BackendService.post<PersonOrder>("personOrders", orderBody);
        }
        const positionBody = {food: food.links.self.href, personOrder: newOrder.links.self.href};
        return BackendService.post("personOrderPositions", positionBody);
    }

    static pay(order: PersonOrder) {
        return BackendService.patch<PersonOrder>(order.links.self, {payed: true});
    }

    static getOrderSummary(order: Order): Promise<OrderSummaryItem[]> {
        return PersonOrderService.getPersonOrders(order)
            .then(async personOrders => {
                // use string to ensure identity
                const map = new Map<string, OrderSummaryItem>();
                for (const personOrder of personOrders) {
                    const payed = personOrder.payed;
                    const person = await BackendService.get<Person>(personOrder.links.person);
                    const positions = await PersonOrderService.getPositions(personOrder);
                    for (const position of positions) {
                        const key = position.food.links.self.href;
                        let summaryItem = map.get(key);
                        if (summaryItem === undefined) {
                            summaryItem = {food: position.food, positions: []};
                        }
                        const custom = position.custom;
                        const positionKey = position.links.self.href;
                        summaryItem.positions.push({key: positionKey, person, custom, payed});
                        map.set(key, summaryItem);
                    }
                }
                return map;
            }).then(map => Array.from(map.values()));
    }

    private static async fetchFood(positions: PersonOrderPosition[]): Promise<PersonOrderPosition[]> {
        for (const position of positions) {
            position.food = await FoodService.get(position.links.food);
        }
        return positions;
    }

}
