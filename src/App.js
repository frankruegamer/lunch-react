import React from 'react';
import './App.css';
import RestaurantList from "./business/restaurant/RestaurantList";
import FoodList from "./business/restaurant/FoodList";

function App() {
    return (
        <>
            <RestaurantList/>
            <FoodList/>
        </>
    );
}

export default App;
