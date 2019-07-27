import React, {useEffect, useState} from "react";
import {Search, SearchProps, SearchResultData} from "semantic-ui-react";
import Food from "../domain/Food";
import Restaurant from "../domain/Restaurant";
import FoodService from "../service/FoodService";

interface FoodSearchProps {
    restaurant: Restaurant;
    onFoodSelect: (food: Food) => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({restaurant, onFoodSelect}) => {
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

    function handleResultSelect(event: any, data: SearchResultData) {
        setInput("");
        const result = data.result;
        const food = foods.find(f => f.name === result.title && f.description === result.description);
        onFoodSelect(food as Food);
    }

    const results = foods.map(food => ({
        description: food.description,
        key: food.name + food.description,
        price: food.price.toFixed(2) + " €",
        title: food.name
    }));
    return <Search
        value={input}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect}
        results={results}
    />;
};

export default FoodSearch;
