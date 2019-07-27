import * as React from "react";
import {Header, Icon, Segment} from "semantic-ui-react";
import PersonOrderPosition from "../domain/PersonOrderPosition";
import PersonOrderListItem from "./PersonOrderListItem";

interface PersonOrderListProps {
    positions: PersonOrderPosition[];
    onRemove: (position: PersonOrderPosition) => void;
}

const PersonOrderList: React.FC<PersonOrderListProps> = ({positions, onRemove}) => {
    if (positions.length > 0) {
        return (
            <Segment.Group>
                {positions.map(p => <PersonOrderListItem key={p.links.self.href} position={p} onRemove={onRemove}/>)}
            </Segment.Group>
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
