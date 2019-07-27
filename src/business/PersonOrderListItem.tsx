import React from "react";
import {Button, Grid, Header, Label, Popup, Segment} from "semantic-ui-react";
import PersonOrderPosition from "../domain/PersonOrderPosition";

interface PersonOrderListItemProps {
    position: PersonOrderPosition;
    onRemove: (position: PersonOrderPosition) => void;
}

const PersonOrderListItem: React.FC<PersonOrderListItemProps> = ({position, onRemove}) => {
    const food = position.food;
    const style = {
        border: 0,
        borderRadius: 0,
        boxShadow: "0px 0px",
        padding: 0
    };
    const removeItem = () => onRemove(position);
    const segment = (
        <Segment>
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
    return (
        <Popup
            key={position.links.self.href}
            basic
            trigger={segment}
            position="right center"
            mouseEnterDelay={500}
            mouseLeaveDelay={200}
            hoverable
            style={style}
        >
            <Button icon={{name: "remove"}} onClick={removeItem}/>
        </Popup>
    );
};

export default PersonOrderListItem;
