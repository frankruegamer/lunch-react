import * as React from "react";
import {useEffect, useState} from "react";
import {Grid} from "semantic-ui-react";
import Food from "../../domain/Food";
import Order from "../../domain/Order";
import Person from "../../domain/Person";
import PersonOrder from "../../domain/PersonOrder";
import PersonOrderPosition from "../../domain/PersonOrderPosition";
import Restaurant from "../../domain/Restaurant";
import OrderService from "../../service/OrderService";
import PersonOrderService from "../../service/PersonOrderService";
import AlreadyPaidMessage from "./AlreadyPaidMessage";
import FoodSearch from "./FoodSearch";
import PersonOrderList from "./PersonOrderList";

interface PersonOverviewProps {
    order: Order;
    restaurant: Restaurant;
    person: Person;
    onOrderChange: (order: Order) => void;
}

const PersonOverview: React.FC<PersonOverviewProps> = ({order, restaurant, person, onOrderChange}) => {
    const [personOrder, setPersonOrder] = useState<PersonOrder>();
    useEffect(() => {
        PersonOrderService.getByPerson(order, person)
            .then(setPersonOrder)
            .catch(() => null);
    }, [order, person]);

    function orderChange() {
        OrderService.refresh(order)
            .then(onOrderChange);
    }

    function addFood(food: Food) {
        PersonOrderService.createPersonOrder(food, {personOrder, order, person})
            .then(orderChange);
    }

    function removePosition(position: PersonOrderPosition) {
        PersonOrderService.deletePosition(position)
            .then(orderChange);
    }

    function handlePayment() {
        if (personOrder !== undefined) {
            PersonOrderService.pay(personOrder)
                .then(setPersonOrder);
        }
    }

    const search = <FoodSearch restaurant={restaurant} onFoodSelect={addFood}/>;
    return (
        <Grid columns={2}>
            <Grid.Column>
                <PersonOrderList personOrder={personOrder} onRemove={removePosition} onPayment={handlePayment}/>
            </Grid.Column>
            <Grid.Column style={{paddingLeft: "3em"}}>
                {(personOrder === undefined || !personOrder.paid) ? search : <AlreadyPaidMessage/>}
            </Grid.Column>
        </Grid>
    );
};

export default PersonOverview;
