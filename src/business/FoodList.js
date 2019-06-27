import React from "react";
import {Pagination, Table} from "semantic-ui-react";
import FoodService from "../service/FoodService";

export default class FoodList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            foods: [],
            activePage: 1,
            totalPages: 5
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.updateFoodList = this.updateFoodList.bind(this);
    }

    componentDidMount() {
        this.updateFoodList(this.state.activePage);
    }

    handlePageChange(e, {activePage}) {
        this.setState({
            activePage: activePage
        });
        this.updateFoodList(activePage);
    }

    updateFoodList(page) {
        FoodService.getAll(page)
            .then(json => {
                this.setState({
                    foods: json._embedded.foods,
                    totalPages: json.page.totalPages
                })
            });
    }

    render() {
        const {foods, totalPages, activePage} = this.state;
        const rows = foods.map(food =>
            <Table.Row key={food.name + food.description}>
                <Table.Cell>{food.number}</Table.Cell>
                <Table.Cell>{food.name}</Table.Cell>
                <Table.Cell>{food.description}</Table.Cell>
                <Table.Cell>{food.price.toFixed(2)} €</Table.Cell>
            </Table.Row>
        );
        return (
            <>
                <Pagination activePage={activePage} totalPages={totalPages} onPageChange={this.handlePageChange}/>
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
            </>
        );
    }
}