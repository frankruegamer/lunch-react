import React from "react";
import Restaurant from "../domain/Restaurant";
import {Menu} from "semantic-ui-react";

interface RestaurantMenuItemProps {
    restaurant?: Restaurant
}

const RestaurantMenuItem: React.FC<RestaurantMenuItemProps> = ({restaurant}) => {
    if (restaurant !== undefined) {
        return (
            <Menu.Item>
                {restaurant.name}
            </Menu.Item>
        )
    } else {
        return null;
    }
};

export default RestaurantMenuItem