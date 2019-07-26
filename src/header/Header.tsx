import React, {useEffect, useState} from "react";
import {Image, Menu, Responsive} from "semantic-ui-react";
import Order from "../domain/Order";
import Person from "../domain/Person";
import Restaurant from "../domain/Restaurant";
import logo from "../logo.svg";
import OrderService from "../service/OrderService";
import LogoutMenuItem from "./LogoutMenuItem";
import NewOrderMenuItem from "./NewOrderMenuItem";
import OrderMenuItem from "./OrderMenuItem";
import PersonMenuItem from "./PersonMenuItem";
import RestaurantMenuItem from "./RestaurantMenuItem";

interface HeaderProps {
    restaurant?: Restaurant;
    order?: Order;
    person?: Person;
    onOrderChange: (order: Order) => void;
    onPersonChange: (person: Person) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({onLogout, onOrderChange, onPersonChange, order, person, restaurant}) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        OrderService.getLast10()
            .then(o => {
                setOrders(o);
                if (o.length > 0) {
                    onOrderChange(o[0]);
                }
            });
    }, [onOrderChange]);

    function handleNewOrder(o: Order) {
        OrderService.getLast10().then(setOrders);
        onOrderChange(o);
    }

    let rightMenu;
    if (person === undefined) {
        rightMenu = <PersonMenuItem onPersonChange={onPersonChange}/>;
    } else {
        rightMenu = (
            <>
                <Menu.Item content={person.name}/>
                <LogoutMenuItem onLogout={onLogout}/>
            </>
        );
    }

    return (
        <Menu fixed="top">
            <Responsive {...Responsive.onlyComputer}>
                <Menu.Item>
                    <Image size="mini" src={logo} className="App-logo"/>
                    Lunch Organizer
                </Menu.Item>
            </Responsive>
            <OrderMenuItem order={order} orders={orders} onOrderChange={onOrderChange}/>
            <RestaurantMenuItem restaurant={restaurant}/>
            <NewOrderMenuItem onNewOrder={handleNewOrder}/>
            <Menu.Menu position="right">
                {rightMenu}
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
