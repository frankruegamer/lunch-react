import * as React from "react";
import {useEffect, useState} from "react";
import {Divider, Header, Icon, Segment} from "semantic-ui-react";
import PersonOrder from "../../domain/PersonOrder";
import PersonOrderPosition from "../../domain/PersonOrderPosition";
import PersonOrderService from "../../service/PersonOrderService";
import FoodPriceGrid from "./FoodPriceGrid";
import PayButton from "./PayButton";
import PersonOrderListItem from "./PersonOrderListItem";

interface PersonOrderListProps {
    personOrder?: PersonOrder;
    onRemove: (position: PersonOrderPosition) => void;
    onPayment: () => void;
}

const PersonOrderList: React.FC<PersonOrderListProps> = ({personOrder, onRemove, onPayment}) => {
    const [positions, setPositions] = useState<PersonOrderPosition[]>([]);
    useEffect(() => {
        if (personOrder === undefined) {
            setPositions([]);
        } else {
            PersonOrderService.getPositions(personOrder)
                .then(setPositions);
        }
    }, [personOrder]);

    if (personOrder !== undefined && positions.length > 0) {
        const segments = positions.map(p => (
            <PersonOrderListItem
                key={p.links.self.href}
                position={p}
                disableRemove={personOrder.payed}
                onRemove={onRemove}
            />
        ));
        return (
            <>
                <Segment.Group>
                    {segments}
                </Segment.Group>
                <Divider/>
                <Segment>
                    <FoodPriceGrid name={"Total: " + positions.length} price={personOrder.price}/>
                </Segment>
                <PayButton payed={personOrder.payed} price={personOrder.price} onPayment={onPayment}/>
            </>
        );
    } else {
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name="food"/>
                    No food has been added for this order.
                </Header>
            </Segment>
        );
    }
};

export default PersonOrderList;
