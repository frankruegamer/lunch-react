import React from "react";
import {Grid, Header, Icon, Label} from "semantic-ui-react";
import PriceFormatter from "../../tools/PriceFormatter";
import SemanticColorPicker from "../../tools/SemanticColorPicker";
import OrderSummaryItem from "./OrderSummaryItem";

interface AdvancedFoodPriceGridProps {
    item: OrderSummaryItem;
    colorPicker: SemanticColorPicker;
}

const AdvancedFoodPriceGrid: React.FC<AdvancedFoodPriceGridProps> = ({item, colorPicker}) => {
    const {food, positions} = item;
    const labels = positions.map(position => {
        return (
            <Label key={position.key} color={colorPicker.get(position.person.name)}>
                <Icon name={position.paid ? "check" : "x"}/>
                {position.person.name}
            </Label>
        );
    });
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={12} verticalAlign="middle">
                    <Header as="h4">{food.name}</Header>
                    {food.description && <Header.Subheader> {food.description} </Header.Subheader>}
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                    <Label tag color="green">
                        {PriceFormatter.format(food.price)}
                        <Label.Detail>
                            {"x" + positions.length}
                        </Label.Detail>
                    </Label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {labels}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default AdvancedFoodPriceGrid;
