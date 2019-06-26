import React from "react";
import {Image, Menu, Responsive} from "semantic-ui-react";
import logo from '../logo.svg';
import Logout from "./Logout";
import NewOrder from "./NewOrder";
import OrderMenuItem from "./OrderMenuItem";

export default function () {
    return (
        <Menu fixed='top'>
            <Responsive {...Responsive.onlyComputer}>
                <Menu.Item>
                    <Image size='mini' src={logo} className='App-logo'/>
                    Lunch Organizer
                </Menu.Item>
            </Responsive>
            <OrderMenuItem/>
            <NewOrder/>
            <Logout/>
        </Menu>
    );
}