import Food from "../../domain/Food";
import Person from "../../domain/Person";

export interface Position {
    key: string;
    person: Person;
    custom: string | null;
    paid: boolean;
}

export default interface OrderSummaryItem {
    food: Food;
    positions: Position[];
}
