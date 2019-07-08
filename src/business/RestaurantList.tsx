import React from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import RestaurantService from "../service/RestaurantService";
import Restaurant from "../domain/Restaurant";

interface RestaurantListProps {
    handleRestaurantChange: (restaurant?: Restaurant) => void
}

interface RestaurantListState {
    restaurants: Restaurant[]
}

export default class RestaurantList extends React.Component<RestaurantListProps, RestaurantListState> {

    constructor(props: Readonly<RestaurantListProps>) {
        super(props);
        this.state = {
            restaurants: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(): void {
        let updateState = (restaurants: Restaurant[]) => this.setState({
            restaurants: restaurants
        });
        RestaurantService.getAll().then(updateState);
    }

    handleChange(event: any, data: DropdownProps): void {
        const restaurant = this.state.restaurants.find(restaurant => restaurant.name === data.value);
        this.props.handleRestaurantChange(restaurant);
    }

    render(): React.ReactNode {
        const options: DropdownItemProps[] = this.state.restaurants.map(restaurant => {
            const name = restaurant.name;
            return {key: name, text: name, value: name};
        });
        return <Dropdown placeholder='Select restaurant...' clearable selection options={options} onChange={this.handleChange}/>
    }
}

