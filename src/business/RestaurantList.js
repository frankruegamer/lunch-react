import React from "react";
import {Dropdown} from "semantic-ui-react";
import RestaurantService from "../service/RestaurantService";

export default class RestaurantList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            restaurants: []
        };
        this.pleaselog = this.pleaselog.bind(this);
    }

    componentDidMount() {
        const updateState = restaurants => this.setState({
            restaurants: restaurants
        });
        RestaurantService.getAll().then(updateState);
    }

    pleaselog(event, data) {
        const restaurant = this.state.restaurants.find(restaurant => restaurant.name === data.value);
        console.log(restaurant);
    }

    render() {
        const options = this.state.restaurants.map(restaurant => {
            const name = restaurant.name;
            return ({key: name, text: name, value: name});
        });
        return <Dropdown placeholder='Select restaurant...' selection options={options} onChange={this.pleaselog}/>
    }
}

