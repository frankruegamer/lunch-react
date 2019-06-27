import BackendService from "./BackendService";

export default class OrderService {

    static getLast10() {
        return BackendService.getCollection("orders/search/last10")
    }

}