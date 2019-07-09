import React, {useState} from 'react';
import './App.css';
import RestaurantList from "./business/RestaurantList";
import Header from "./header/Header";
import FoodList from "./business/FoodList";
import Restaurant from "./domain/Restaurant";

const App: React.FC = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>(undefined);
    return (
        <>
            <Header restaurant={restaurant}/>
            <div className='App'>
                <RestaurantList handleRestaurantChange={setRestaurant}/>
                <FoodList restaurant={restaurant}/>
            </div>
        </>
    );
};

export default App;
