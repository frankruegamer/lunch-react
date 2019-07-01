import React from "react";
import {Dropdown, DropdownProps} from "semantic-ui-react";
import RestaurantService from "../service/RestaurantService";
import Restaurant from "../domain/Restaurant";

interface RestaurantListState {
    restaurants: Restaurant[]
}

export default class RestaurantList extends React.Component<object, RestaurantListState> {

    constructor(props: Readonly<object>) {
        super(props);
        this.state = {
            restaurants: []
        };
        this.pleaselog = this.pleaselog.bind(this);
    }

    componentDidMount(): void {
        let updateState = (restaurants: Restaurant[]) => this.setState({
            restaurants: restaurants
        });
        RestaurantService.getAll().then(updateState);
    }

    pleaselog(event: any, data: DropdownProps): void {
        const restaurant = this.state.restaurants.find(restaurant => restaurant.name === data.value);
        console.log(restaurant);
    }

    render(): React.ReactNode {
        const options = this.state.restaurants.map(restaurant => {
            const name = restaurant.name;
            return ({key: name, text: name, value: name});
        });
        return <Dropdown placeholder='Select restaurant...' selection options={options} onChange={this.pleaselog}/>
    }
}

