import * as React from "react";
import {useCallback, useEffect, useState} from "react";
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
    // used as dependency to trigger rendering
    const [positionChange, setPositionChange] = useState<number>();

    const [personOrder, setPersonOrder] = useState<PersonOrder>();
    useEffect(() => {
        PersonOrderService.getByPerson(order, person)
            .then(setPersonOrder)
            .catch(() => null);
    }, [positionChange, order, person]);

    const [positions, setPositions] = useState<PersonOrderPosition[]>([]);
    useEffect(() => {
        if (personOrder === undefined) {
            setPositions([]);
        } else {
            PersonOrderService.getPositions(personOrder)
                .then(setPositions);
        }
    }, [personOrder]);

    const orderChange = useCallback(() => {
        setPositionChange(Math.random());
    }, []);

    function addFood(food: Food) {
        PersonOrderService.createPersonOrder(food, {personOrder, order, person})
            .then(orderChange);
    }

    function removePosition(position: PersonOrderPosition) {
        PersonOrderService.deletePosition(position)
            .then(orderChange);
    }

    return (
        <Grid columns={2}>
            <Grid.Column>
                <PersonOrderList positions={positions} onRemove={removePosition}/>
            </Grid.Column>
            <Grid.Column style={{paddingLeft: "3em"}}>
                <FoodSearch restaurant={restaurant} onFoodSelect={addFood}/>
            </Grid.Column>
        </Grid>
    );
};

export default PersonOverview;
