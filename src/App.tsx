import React, {useState} from "react";
import "./App.css";
import PersonOverview from "./business/PersonOverview";
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

    const MainContent = (() => {
        if (state.order === undefined || person === undefined) {
            return null;
        }
        return (
            <div className="App">
                <PersonOverview order={state.order} person={person}/>
            </div>
        );
    });

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
            <MainContent/>
        </>
    );
};

export default App;
