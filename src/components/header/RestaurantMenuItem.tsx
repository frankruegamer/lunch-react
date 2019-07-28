import React from "react";
import {Menu} from "semantic-ui-react";
import Restaurant from "../../domain/Restaurant";

interface RestaurantMenuItemProps {
    restaurant?: Restaurant;
}

const RestaurantMenuItem: React.FC<RestaurantMenuItemProps> = ({restaurant}) => {
    if (restaurant === undefined) {
        return null;
    }
    return (
        <Menu.Item>
            {restaurant.name}
        </Menu.Item>
    );
};

export default RestaurantMenuItem;
