import Food from "../domain/Food";
import Hal from "../domain/hal/Hal";
import Link from "../domain/hal/Link";
import Restaurant from "../domain/Restaurant";
import BackendService from "./BackendService";

export default class FoodService {

    static get(link: Link): Promise<Food> {
        return BackendService.get(link);
    }

    static getFromRegex(regex: string, page: number, restaurant: Restaurant): Promise<Hal<Food>> {
        const params: { [key: string]: any } = {
            page: page - 1,
            regex,
            restaurant: restaurant.links.self.href,
            size: 6,
            sort: "name"
        };
        return BackendService.getPaginatedCollection<Food>("foods/search/findByNameRegexAndRestaurant", params);
    }

}
