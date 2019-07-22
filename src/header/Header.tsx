import React from "react";
import {Image, Menu, Responsive} from "semantic-ui-react";
import Restaurant from "../domain/Restaurant";
import logo from "../logo.svg";
import Logout from "./Logout";
import NewOrder from "./NewOrder";
import OrderMenuItem from "./OrderMenuItem";
import RestaurantMenuItem from "./RestaurantMenuItem";

interface HeaderProps {
    restaurant?: Restaurant;
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
            <OrderMenuItem/>
            <RestaurantMenuItem restaurant={props.restaurant}/>
            <NewOrder/>
            <Logout/>
        </Menu>
    );
};

export default Header;
