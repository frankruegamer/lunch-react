import * as React from "react";
import {useEffect, useState} from "react";
import {Grid} from "semantic-ui-react";
import Food from "../domain/Food";
import Order from "../domain/Order";
import Person from "../domain/Person";
import PersonOrder from "../domain/PersonOrder";
import PersonOrderPosition from "../domain/PersonOrderPosition";
import Restaurant from "../domain/Restaurant";
import PersonOrderService from "../service/PersonOrderService";
import FoodSearch from "./FoodSearch";
import PersonOrderList from "./PersonOrderList";

interface PersonOverviewProps {
    order: Order;
    restaurant: Restaurant;
    person: Person;
}

const PersonOverview: React.FC<PersonOverviewProps> = ({order, restaurant, person}) => {
    const [newPosition, setNewPosition] = useState<PersonOrderPosition>();

    const [personOrder, setPersonOrder] = useState<PersonOrder>();
    useEffect(() => {
        PersonOrderService.getByPerson(order, person)
            .then(setPersonOrder)
            .catch(() => null);
    }, [newPosition, order, person]);

    const [positions, setPositions] = useState<PersonOrderPosition[]>([]);
    useEffect(() => {
        if (personOrder === undefined) {
            setPositions([]);
        } else {
            PersonOrderService.getPositions(personOrder)
                .then(setPositions);
        }
    }, [personOrder]);

    function addFood(food: Food) {
        PersonOrderService.createPersonOrder(food, {personOrder, order, person})
            .then(setNewPosition);
    }

    return (
        <Grid columns={2}>
            <Grid.Column>
                <PersonOrderList positions={positions}/>
            </Grid.Column>
            <Grid.Column>
                <FoodSearch restaurant={restaurant} onFoodSelect={addFood}/>
            </Grid.Column>
        </Grid>
    );
};

export default PersonOverview;
