import React from "react";
import Restaurant from "../../domain/Restaurant";
import RestaurantCard from "./RestaurantCard";

interface OrderOverviewProps {
    restaurant: Restaurant;
}

const OrderOverview: React.FC<OrderOverviewProps> = ({restaurant}) => {
    return <RestaurantCard restaurant={restaurant}/>;
};

export default OrderOverview;
