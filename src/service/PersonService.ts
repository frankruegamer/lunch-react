import Person from "../domain/Person";
import BackendService from "./BackendService";

export default class PersonService {

    static getAll(): Promise<Person[]> {
        return BackendService.getAllFromPaginatedCollection("persons", {sort: "name"});
    }

    static createNew(name: string): Promise<Person> {
        return BackendService.post("persons", {name});
    }

}
