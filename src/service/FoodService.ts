import BackendService from "./BackendService";
import Food from "../domain/Food";
import Restaurant from "../domain/Restaurant";
import Hal from "../domain/hal/Hal";

function getAll(): Promise<Food[]> {
    return BackendService.getCollection<Food>('foods');
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
        const params: {[key: string]: any} = {
            regex: regex,
            page: page - 1,
            size: 10,
            sort: 'name'
        };
        if (restaurant !== undefined) {
            params.restaurant = restaurant.links.self.href;
            return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegexAndRestaurant", params)
        } else {
            return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegex", params)
        }
    }

}