import React, {useCallback, useEffect, useRef, useState} from "react";
import {Divider, Grid, Header, Label, Segment} from "semantic-ui-react";
import Order from "../../domain/Order";
import PersonOrder from "../../domain/PersonOrder";
import PersonOrderService from "../../service/PersonOrderService";
import SemanticColorPicker from "../../tools/SemanticColorPicker";
import NoFoodPlaceholder from "../NoFoodPlaceholder";
import AdvancedFoodPriceGrid from "./AdvancedFoodPriceGrid";
import DebtorLabel from "./DebtorLabel";
import OrderSummaryItem from "./OrderSummaryItem";

interface OrderSummaryProps {
    order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({order}) => {
    const [summaryItems, setSummaryItems] = useState<OrderSummaryItem[]>([]);

    const getSummary = useCallback(() => {
        PersonOrderService.getOrderSummary(order)
                          .then(setSummaryItems);
    }, [order]);

    useEffect(() => {
        getSummary();
    }, [getSummary]);

    const colorPicker = useRef(new SemanticColorPicker());

    const segments = summaryItems.map(i => {
        return (
            <Segment key={i.food.links.self.href}>
                <AdvancedFoodPriceGrid item={i} colorPicker={colorPicker.current}/>
            </Segment>
        );
    });
    const numberOfPositions = summaryItems.map(i => i.positions.length).reduce((u, v) => u + v, 0);
    const debtors = Array.from(new Set(summaryItems.map(i => i.positions)
                                                   .flat()
                                                   .filter(p => !p.paid)
                                                   .map(p => p.person)));

    function handlePayment(personOrder: PersonOrder) {
        PersonOrderService.pay(personOrder)
                          .then(getSummary);
    }

    const labels = debtors.map(person => {
        return <DebtorLabel
            key={person.name}
            order={order}
            person={person}
            onClick={handlePayment}
            colorPicker={colorPicker.current}
        />;
    });

    if (summaryItems.length > 0) {
        return (
            <>
                <Segment.Group>
                    {segments}
                </Segment.Group>
                <Divider/>
                <Segment>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={12} verticalAlign="middle">
                                <Header as="h4">{"Total: " + numberOfPositions}</Header>
                            </Grid.Column>
                            <Grid.Column width={4} textAlign="right">
                                <Label tag color="green">
                                    {order.price.toFixed(2) + " €"}
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {labels}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </>
        );
    } else {
        return <NoFoodPlaceholder/>;
    }
};

export default OrderSummary;
