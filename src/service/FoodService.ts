import BackendService from "./BackendService";
import Food from "../domain/Food";
import Pageable from "../domain/Pageable";

function getAll(): Promise<Food[]> {
    return BackendService.getCollection<Food>('foods');
}

function getAllPaginated(page: number): Promise<Pageable<Food>> {
    const params = {
        page: page - 1,
        size: 10
    };
    return BackendService.getPaginatedCollection<Food>("foods", params);
}


export default class FoodService {

    static getAll(page?: number): Promise<Pageable<Food>> | Promise<Food[]> {
        if (page !== undefined) {
            return getAllPaginated(page);
        } else {
            return getAll();
        }
    }

    static getFromRegex(regex: string, page: number): Promise<Pageable<Food>> {
        const params = {
            regex: regex,
            restaurant: '/1',
            page: page - 1,
            size: 10,
            sort: 'name'
        };
        return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegex", params)
    }

}