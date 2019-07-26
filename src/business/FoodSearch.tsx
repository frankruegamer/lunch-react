import React, {useEffect, useState} from "react";
import {Search, SearchProps} from "semantic-ui-react";
import Food from "../domain/Food";
import Restaurant from "../domain/Restaurant";
import FoodService from "../service/FoodService";

interface FoodSearchProps {
    restaurant: Restaurant;
}

const FoodSearch: React.FC<FoodSearchProps> = ({restaurant}) => {
    const [input, setInput] = useState("");
    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        FoodService.getFromRegex(input, 0, restaurant)
            .then(response => {
                setFoods(response.objects);
            });
    }, [restaurant, input]);

    function handleSearchChange(event: any, {value}: SearchProps): void {
        setInput(value as string);
    }

    const results = foods.map(food => ({
        description: food.description,
        key: food.name + food.description,
        price: food.price.toFixed(2) + " €",
        title: food.name
    }));
    return <Search value={input} onSearchChange={handleSearchChange} results={results}/>;
};

export default FoodSearch;
