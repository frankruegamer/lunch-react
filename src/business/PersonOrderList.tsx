import * as React from "react";
import {Grid, Header, Icon, Label, Segment, Transition} from "semantic-ui-react";
import PersonOrderPosition from "../domain/PersonOrderPosition";

interface PersonOrderListProps {
    positions: PersonOrderPosition[];
}

const PersonOrderList: React.FC<PersonOrderListProps> = ({positions}) => {
    const items = positions.map(p => {
        const food = p.food;
        return (
            <Segment key={p.links.self.href}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={12} verticalAlign="middle">
                            <Header as="h4">{food.name}</Header>
                            {food.description && <Header.Subheader> {food.description} </Header.Subheader>}
                        </Grid.Column>
                        <Grid.Column width={4} textAlign="right">
                            <Label tag color="green">{food.price.toFixed(2) + " €"}</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    });

    if (positions.length > 0) {
        return (
            <Transition.Group as={Segment.Group} animation="browse">
                {items}
            </Transition.Group>
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
