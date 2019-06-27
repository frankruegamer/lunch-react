import React from "react";
import {Table} from "semantic-ui-react";

export default function FoodTable(props) {
    const rows = props.foods.map(food =>
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