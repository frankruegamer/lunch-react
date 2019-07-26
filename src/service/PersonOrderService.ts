import Linkable from "../domain/hal/Linkable";
import Links from "../domain/hal/Links";
import Order from "../domain/Order";
import Person from "../domain/Person";
import PersonOrderPosition from "../domain/PersonOrderPosition";
import BackendService from "./BackendService";
import FoodService from "./FoodService";

interface PersonOrder extends Linkable<Links> {
    personOrderPositions: PersonOrderPosition[];
}

export default class PersonOrderService {

    static getByPerson(order: Order, person: Person): Promise<PersonOrderPosition[]> {
        return BackendService.getCollection<PersonOrderPosition>(order.links.personOrders, {name: person.name})
            .then(PersonOrderService.fetchFood);
    }

    static async fetchFood(positions: PersonOrderPosition[]): Promise<PersonOrderPosition[]> {
        for (const position of positions) {
            position.food = await FoodService.get(position.links.food);
        }
        return positions;
    }

}
