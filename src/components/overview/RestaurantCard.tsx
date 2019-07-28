import React from "react";
import {Card, Icon} from "semantic-ui-react";
import Restaurant from "../../domain/Restaurant";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({restaurant}) => {
    const {name, address} = restaurant;
    const phone = "+" + restaurant.telephone.replace(/-/g, " ");
    return (
        <Card>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <div>{address.street + " " + address.houseNumber}</div>
                    <div>{address.postalCode + " " + address.city}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <div><Icon name="phone"/>{phone}</div>
            </Card.Content>
        </Card>
    );
};

export default RestaurantCard;
