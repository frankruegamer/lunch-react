import React from "react";
import {Image, Menu, Responsive} from "semantic-ui-react";
import Order from "../domain/Order";
import Restaurant from "../domain/Restaurant";
import logo from "../logo.svg";
import LogoutMenuItem from "./LogoutMenuItem";
import NewOrderMenuItem from "./NewOrderMenuItem";
import OrderMenuItem from "./OrderMenuItem";
import RestaurantMenuItem from "./RestaurantMenuItem";

interface HeaderProps {
    restaurant?: Restaurant;
    order?: Order;
    onOrderChange: (order: Order) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <Menu fixed="top">
            <Responsive {...Responsive.onlyComputer}>
                <Menu.Item>
                    <Image size="mini" src={logo} className="App-logo"/>
                    Lunch Organizer
                </Menu.Item>
            </Responsive>
            <OrderMenuItem order={props.order} onOrderChange={props.onOrderChange}/>
            <RestaurantMenuItem restaurant={props.restaurant}/>
            <NewOrderMenuItem onNewOrder={props.onOrderChange}/>
            <LogoutMenuItem/>
        </Menu>
    );
};

export default Header;
