import React from "react";
import {Grid} from "semantic-ui-react";
import Order from "../../domain/Order";
import Restaurant from "../../domain/Restaurant";
import OrderSummary from "./OrderSummary";
import RestaurantCard from "./RestaurantCard";

interface OrderOverviewProps {
    restaurant: Restaurant;
    order: Order;
}

const OrderOverview: React.FC<OrderOverviewProps> = ({restaurant, order}) => {
    return (
        <Grid columns={2}>
            <Grid.Column>
                <OrderSummary order={order}/>
            </Grid.Column>
            <Grid.Column>
                <RestaurantCard restaurant={restaurant}/>
            </Grid.Column>
        </Grid>
    );
};

export default OrderOverview;
