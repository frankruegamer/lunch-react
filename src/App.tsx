import React, {useState} from "react";
import "./App.css";
import FoodList from "./business/FoodList";
import RestaurantList from "./business/RestaurantList";
import Restaurant from "./domain/Restaurant";
import Header from "./header/Header";

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
