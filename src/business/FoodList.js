import React from "react";
import {Table} from "semantic-ui-react";

export default class FoodList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            foods: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/restaurants/1/foods")
            .then(response => response.json())
            .then(data => data._embedded.foods)
            .then(foods => this.setState({
                foods: foods
            }));
    }

    render() {
        const rows = this.state.foods.map(food =>
            <Table.Row key={food.name + food.description}>
                <Table.Cell>{food.number}</Table.Cell>
                <Table.Cell>{food.name}</Table.Cell>
                <Table.Cell>{food.description}</Table.Cell>
                <Table.Cell>{food.price.toFixed(2)} €</Table.Cell>
            </Table.Row>
        );
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Number</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }
}