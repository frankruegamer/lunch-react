import React, {useState} from "react";
import "./App.css";
import FoodList from "./business/FoodList";
import Order from "./domain/Order";
import Restaurant from "./domain/Restaurant";
import Header from "./header/Header";
import RestaurantService from "./service/RestaurantService";

interface AppState {
    order?: Order;
    restaurant?: Restaurant;
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({});

    function handleOrderChange(order: Order) {
        RestaurantService.getFromOrder(order)
            .then(restaurant => {
                setState({order, restaurant});
            });
    }

    return (
        <>
            <Header restaurant={state.restaurant} order={state.order} onOrderChange={handleOrderChange}/>
            <div className="App">
                <FoodList restaurant={state.restaurant}/>
            </div>
        </>
    );
};

export default App;
