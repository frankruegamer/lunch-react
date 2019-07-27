import * as React from "react";
import {Divider, Header, Icon, Segment} from "semantic-ui-react";
import PersonOrderPosition from "../domain/PersonOrderPosition";
import FoodPriceGrid from "./FoodPriceGrid";
import PersonOrderListItem from "./PersonOrderListItem";

interface PersonOrderListProps {
    positions: PersonOrderPosition[];
    onRemove: (position: PersonOrderPosition) => void;
}

const PersonOrderList: React.FC<PersonOrderListProps> = ({positions, onRemove}) => {
    if (positions.length > 0) {
        const segments = positions.map(p => (
            <PersonOrderListItem key={p.links.self.href} position={p} onRemove={onRemove}/>
        ));
        const total = positions.reduce((v, p) => v + p.food.price, 0);
        return (
            <>
                <Segment.Group>
                    {segments}
                </Segment.Group>
                <Divider/>
                <Segment>
                    <FoodPriceGrid name="Total" price={total}/>
                </Segment>
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
