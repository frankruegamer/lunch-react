import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, Header, Icon, Label, Segment} from "semantic-ui-react";
import Order from "../domain/Order";
import Person from "../domain/Person";
import PersonOrderPosition from "../domain/PersonOrderPosition";
import PersonOrderService from "../service/PersonOrderService";

interface PersonOverviewProps {
    order: Order;
    person: Person;
}

const PersonOverview: React.FC<PersonOverviewProps> = ({order, person}) => {
    const [positions, setPositions] = useState<PersonOrderPosition[]>([]);

    useEffect(() => {
        PersonOrderService.getByPerson(order, person)
            .then(setPositions);
    }, [order, person]);

    const items = positions.map(p => {
        const food = p.food;
        return (
            <Segment key={food.name + food.description}>
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

    const style = {width: "40%"};
    if (positions.length > 0) {
        return (
            <Segment.Group style={style}>
                {items}
            </Segment.Group>
        );
    } else {
        return (
            <Segment placeholder style={style}>
                <Header icon>
                    <Icon name="food"/>
                    No food has been added for this order.
                </Header>
            </Segment>
        );
    }
};

export default PersonOverview;
