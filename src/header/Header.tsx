import React from "react";
import {Image, Menu, Responsive} from "semantic-ui-react";
import Order from "../domain/Order";
import Person from "../domain/Person";
import Restaurant from "../domain/Restaurant";
import logo from "../logo.svg";
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

const Header: React.FC<HeaderProps> = (props) => {
    let rightMenu;
    if (props.person === undefined) {
        rightMenu = <PersonMenuItem onPersonChange={props.onPersonChange}/>;
    } else {
        rightMenu = (
            <>
                <Menu.Item content={props.person.name}/>
                <LogoutMenuItem onLogout={props.onLogout}/>
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
            <OrderMenuItem order={props.order} onOrderChange={props.onOrderChange}/>
            <RestaurantMenuItem restaurant={props.restaurant}/>
            <NewOrderMenuItem onNewOrder={props.onOrderChange}/>
            <Menu.Menu position="right">
                {rightMenu}
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
