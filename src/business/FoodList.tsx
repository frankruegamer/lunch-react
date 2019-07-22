import React from "react";
import {Input, Pagination, PaginationProps, Search, SearchProps} from "semantic-ui-react";
import Food from "../domain/Food";
import Restaurant from "../domain/Restaurant";
import FoodService from "../service/FoodService";
import FoodTable from "./FoodTable";

interface FoodListProps {
    restaurant?: Restaurant;
}

interface FoodListState {
    foods: Food[];
    activePage: number;
    totalPages: number;
    input: string;
}

export default class FoodList extends React.Component<FoodListProps, FoodListState> {

    constructor(props: Readonly<FoodListProps>) {
        super(props);
        this.state = {
            activePage: 1,
            foods: [],
            input: "",
            totalPages: 5
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.updateFoodList = this.updateFoodList.bind(this);
    }

    componentDidMount(): void {
        const {input, activePage} = this.state;
        this.updateFoodList(input, activePage);
    }

    componentDidUpdate(prevProps: Readonly<FoodListProps>): void {
        if (this.props.restaurant !== prevProps.restaurant) {
            const {input, activePage} = this.state;
            this.updateFoodList(input, activePage);
        }
    }

    handlePageChange(event: any, {activePage}: PaginationProps): void {
        this.updateFoodList(this.state.input, activePage as number);
    }

    handleInputChange(event: any, {value}: { value: string }): void {
        this.updateFoodList(value, 1);
    }

    handleSearchChange(event: any, {value}: SearchProps): void {
        if (value === undefined) {
            return;
        }
        this.updateFoodList(value, 1);
    }

    updateFoodList(input: string, activePage: number): void {
        FoodService.getFromRegex(input, activePage, this.props.restaurant)
            .then(response => {
                return this.setState({
                    activePage,
                    foods: response.objects,
                    input,
                    totalPages: response.page.totalPages,
                });
            })
            .catch(reason => {
                console.log(reason);
                this.setState({
                    activePage,
                    input
                });
            });
    }

    render(): React.ReactNode {
        const {input, foods, totalPages, activePage} = this.state;
        const results = foods.map(food => ({
            description: food.description,
            key: food.name + food.description,
            price: food.price.toFixed(2) + " €",
            title: food.name
        }));
        return (
            <>
                <Input placeholder="Search food..." value={input} onChange={this.handleInputChange}/>
                <Search value={input} onSearchChange={this.handleSearchChange} results={results}/>
                <Pagination activePage={activePage} totalPages={totalPages} onPageChange={this.handlePageChange}/>
                <FoodTable foods={foods}/>
            </>
        );
    }
}
