import React from "react";
import {Grid, Header, Label} from "semantic-ui-react";
import PriceFormatter from "../../tools/PriceFormatter";

interface FoodPriceGridProps {
    name: string;
    description?: string;
    price: number;
}

const FoodPriceGrid: React.FC<FoodPriceGridProps> = React.memo((props) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={12} verticalAlign="middle">
                    <Header as="h4">{props.name}</Header>
                    {props.description && <Header.Subheader> {props.description} </Header.Subheader>}
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                    <Label tag color="green">{PriceFormatter.format(props.price)}</Label>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default FoodPriceGrid;
