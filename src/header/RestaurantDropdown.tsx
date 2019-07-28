import React, {useEffect, useState} from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import Restaurant from "../domain/Restaurant";
import RestaurantService from "../service/RestaurantService";

interface RestaurantDropdownProps {
    handleRestaurantChange: (restaurant?: Restaurant) => void;
}

const RestaurantDropdown: React.FC<RestaurantDropdownProps> = ({handleRestaurantChange}) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        RestaurantService.getAll().then(setRestaurants);
    }, []);

    function handleChange(event: any, data: DropdownProps): void {
        const restaurant = restaurants.find(r => r.name === data.value);
        handleRestaurantChange(restaurant);
    }

    const options: DropdownItemProps[] = restaurants.map(restaurant => {
        const name = restaurant.name;
        return {key: name, text: name, value: name};
    });
    return <Dropdown
        placeholder="Select restaurant..."
        clearable
        selection
        options={options}
        onChange={handleChange}
    />;
};

export default RestaurantDropdown;
