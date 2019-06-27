import React from "react";
import {Pagination} from "semantic-ui-react";
import FoodService from "../service/FoodService";
import FoodTable from "./FoodTable";

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
        return (
            <>
                <Pagination activePage={activePage} totalPages={totalPages} onPageChange={this.handlePageChange}/>
                <FoodTable foods={foods}/>
            </>
        );
    }
}