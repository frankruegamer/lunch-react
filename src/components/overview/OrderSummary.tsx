import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Divider, Grid, Header, Label, Segment} from "semantic-ui-react";
import Order from "../../domain/Order";
import Person from "../../domain/Person";
import PersonOrder from "../../domain/PersonOrder";
import PersonOrderService from "../../service/PersonOrderService";
import PriceFormatter from "../../tools/PriceFormatter";
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
    const [debts, setDebts] = useState<Array<PersonOrder & { person: Person }>>([]);

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
    // memo to prevent endless loop with the following effect
    const debtors = useMemo(() => {
        return Array.from(new Set(summaryItems.map(i => i.positions)
                                              .flat()
                                              .filter(p => !p.paid)
                                              .map(p => p.person)));
    }, [summaryItems]);

    useEffect(() => {
        PersonOrderService.getDebts(order, debtors)
                          .then(setDebts);
    }, [debtors, order]);

    function handlePayment(personOrder: PersonOrder) {
        PersonOrderService.pay(personOrder)
                          .then(getSummary);
    }

    const labels = debts.map(debt => {
        return <DebtorLabel
            key={debt.links.self.href}
            personOrder={debt}
            onClick={handlePayment}
            colorPicker={colorPicker.current}
        />;
    });

    const totalDebts = debts.map(debt => debt.price).reduce((u, v) => u + v, 0);
    const displayTotalDebts = totalDebts > 0;
    const debtsRow = displayTotalDebts && (
        <Grid.Row>
            <Grid.Column width={12} verticalAlign="middle">
                {labels}
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
                <Label tag color="red">
                    {PriceFormatter.format(totalDebts)}
                </Label>
            </Grid.Column>
        </Grid.Row>
    );

    if (summaryItems.length > 0) {
        return (
            <>
                <Segment.Group>
                    {segments}
                </Segment.Group>
                <Divider/>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12} verticalAlign="middle">
                                <Header as="h4">{"Total: " + numberOfPositions}</Header>
                            </Grid.Column>
                            <Grid.Column width={4} textAlign="right">
                                <Label tag color="green">
                                    {PriceFormatter.format(order.price)}
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                        {debtsRow}
                    </Grid>
                </Segment>
            </>
        );
    } else {
        return <NoFoodPlaceholder/>;
    }
};

export default OrderSummary;
