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
        let link = '/1';
        if (restaurant !== undefined) {
            // @ts-ignore
            link = restaurant._links.self;
        }
        const params = {
            regex: regex,
            restaurant: link,
            page: page - 1,
            size: 10,
            sort: 'name'
        };
        return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegex", params)
    }

}