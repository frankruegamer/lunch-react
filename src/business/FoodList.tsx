import React from "react";
import {Input, InputOnChangeData, Pagination, PaginationProps} from "semantic-ui-react";
import FoodService from "../service/FoodService";
import FoodTable from "./FoodTable";
import Food from "../domain/Food";

interface FoodListState {
    foods: Food[]
    activePage: number
    totalPages: number
    input: string
}

export default class FoodList extends React.Component<object, FoodListState> {

    constructor(props: Readonly<object>) {
        super(props);
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

    componentDidMount(): void {
        const {input, activePage} = this.state;
        this.updateFoodList(input, activePage);
    }

    handlePageChange(event: any, {activePage}: PaginationProps): void {
        this.updateFoodList(this.state.input, activePage as number);
    }

    handleInputChange(event: any, {value}: InputOnChangeData): void {
        this.updateFoodList(value, 1);
    }

    updateFoodList(input: string, activePage: number): void {
        FoodService.getFromRegex(input, activePage)
            .then(response => {
                return this.setState({
                    foods: response.objects,
                    totalPages: response.page.totalPages,
                    activePage: activePage,
                    input: input
                });
            })
            .catch(() => {
                this.setState({
                    activePage: activePage,
                    input: input
                })
            });
    }

    render(): React.ReactNode {
        const {input, foods, totalPages, activePage} = this.state;
        return (
            <>
                <Input placeholder="Search food..." value={input} onChange={this.handleInputChange}/>
                <Pagination activePage={activePage} totalPages={totalPages} onPageChange={this.handlePageChange}/>
                <FoodTable foods={foods}/>
            </>
        );
    }
}