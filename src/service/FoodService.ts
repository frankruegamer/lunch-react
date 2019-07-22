import Food from "../domain/Food";
import Hal from "../domain/hal/Hal";
import Restaurant from "../domain/Restaurant";
import BackendService from "./BackendService";

function getAll(): Promise<Food[]> {
    return BackendService.getCollection<Food>("foods");
}

function getAllPaginated(page: number): Promise<Hal<Food>> {
    const params = {
        page: page - 1,
        size: 10
    };
    return BackendService.getPaginatedCollection<Food>("foods", params);
}

export default class FoodService {

    static getAll(page?: number): Promise<Hal<Food>> | Promise<Food[]> {
        if (page !== undefined) {
            return getAllPaginated(page);
        } else {
            return getAll();
        }
    }

    static getFromRegex(regex: string, page: number, restaurant?: Restaurant): Promise<Hal<Food>> {
        const params: { [key: string]: any } = {
            page: page - 1,
            regex,
            size: 10,
            sort: "name"
        };
        if (restaurant !== undefined) {
            params.restaurant = restaurant.links.self.href;
            return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegexAndRestaurant", params);
        } else {
            return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegex", params);
        }
    }

}
