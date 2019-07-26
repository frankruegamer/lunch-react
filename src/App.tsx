import React, {useState} from "react";
import "./App.css";
import FoodList from "./business/FoodList";
import Order from "./domain/Order";
import Person from "./domain/Person";
import Restaurant from "./domain/Restaurant";
import Header from "./header/Header";
import RestaurantService from "./service/RestaurantService";

interface AppState {
    order?: Order;
    restaurant?: Restaurant;
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({});
    const [person, setPerson] = useState<Person>();

    function handleOrderChange(order: Order) {
        RestaurantService.getFromOrder(order)
            .then(restaurant => {
                setState({order, restaurant});
            });
    }

    function logout() {
        setPerson(undefined);
    }

    return (
        <>
            <Header
                restaurant={state.restaurant}
                order={state.order}
                person={person}
                onOrderChange={handleOrderChange}
                onPersonChange={setPerson}
                onLogout={logout}
            />
            <div className="App">
                {person !== undefined && <FoodList restaurant={state.restaurant}/>}
            </div>
        </>
    );
};

export default App;
