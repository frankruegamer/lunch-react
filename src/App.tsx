import React, {useCallback, useState} from "react";
import "./App.css";
import Header from "./components/header/Header";
import PersonOverview from "./components/person/PersonOverview";
import Order from "./domain/Order";
import Person from "./domain/Person";
import Restaurant from "./domain/Restaurant";
import RestaurantService from "./service/RestaurantService";

interface AppState {
    order?: Order;
    restaurant?: Restaurant;
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({});
    const [person, setPerson] = useState<Person>();

    const handleOrderChange = useCallback((order: Order) => {
        RestaurantService.getFromOrder(order)
            .then(restaurant => {
                setState({order, restaurant});
            });
    }, []);

    function logout() {
        setPerson(undefined);
    }

    const MainContent = (() => {
        if (state.order === undefined || person === undefined || state.restaurant === undefined) {
            return null;
        }
        return (
            <PersonOverview order={state.order} restaurant={state.restaurant} person={person}/>
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
            <div className="App">
                <MainContent/>
            </div>
        </>
    );
};

export default App;
