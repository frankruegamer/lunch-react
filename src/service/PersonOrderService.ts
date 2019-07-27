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

    static getByPerson(order: Order, person: Person): Promise<PersonOrder> {
        return BackendService.get(order.links.personOrders, {name: person.name});
    }

    static getPositions(personOrder: PersonOrder): Promise<PersonOrderPosition[]> {
        return BackendService.getCollection<PersonOrderPosition>(personOrder.links.personOrderPositions)
            .then(PersonOrderService.fetchFood);
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

    private static async fetchFood(positions: PersonOrderPosition[]): Promise<PersonOrderPosition[]> {
        for (const position of positions) {
            position.food = await FoodService.get(position.links.food);
        }
        return positions;
    }

}
