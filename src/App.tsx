import React from 'react';
import './App.css';
import RestaurantList from "./business/RestaurantList";
import Header from "./header/Header";
import FoodList from "./business/FoodList";

const App: React.FC = () => {
    return (
        <>
            <Header/>
            <div className='App'>
                <RestaurantList/>
                <FoodList/>
            </div>
        </>
    );
};

export default App;
