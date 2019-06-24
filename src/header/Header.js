import React from "react";
import {Image, Menu, Responsive} from "semantic-ui-react";
import OrderList from "../business/OrderList";
import logo from '../logo.svg';
import Logout from "./Logout";
import NewOrder from "./NewOrder";

export default function () {
    return (
        <Menu fixed='top'>
            <Responsive {...Responsive.onlyComputer}>
                <Menu.Item>
                    <Image size='mini' src={logo} className='App-logo'/>
                    Lunch Organizer
                </Menu.Item>
            </Responsive>
            <Menu.Item>
                <OrderList/>
            </Menu.Item>
            <NewOrder/>
            <Logout/>
        </Menu>
    );
}