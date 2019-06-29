import React from "react";
import {Input, Pagination} from "semantic-ui-react";
import FoodService from "../service/FoodService";
import FoodTable from "./FoodTable";

export default class FoodList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            foods: [],
            activePage: 1,
            totalPages: 5,
            input: ""
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateFoodList = this.updateFoodList.bind(this);
    }

    componentDidMount() {
        const {input, activePage} = this.state;
        this.updateFoodList(input, activePage);
    }

    handlePageChange(e, {activePage}) {
        this.updateFoodList(this.state.input, activePage);
    }

    handleInputChange(e, {value}) {
        this.updateFoodList(value, 1);
    }

    updateFoodList(input, activePage) {
        FoodService.getFromRegex(input, activePage)
            .then(json => {
                return this.setState({
                    foods: json._embedded.foods,
                    totalPages: json.page.totalPages,
                    activePage: activePage,
                    input: input
                });
            });
    }

    render() {
        const {input, foods, totalPages, activePage} = this.state;
        return (
            <>
                <Input value={input} onChange={this.handleInputChange}/>
                <Pagination activePage={activePage} totalPages={totalPages} onPageChange={this.handlePageChange}/>
                <FoodTable foods={foods}/>
            </>
        );
    }
}