import React from "react";
import {Icon, Menu} from "semantic-ui-react";
import NewOrderPopup from "../business/NewOrderPopup";
import Order from "../domain/Order";

interface NewOrderProps {
    onNewOrder: (order: Order) => void;
}

const NewOrderMenuItem: React.FC<NewOrderProps> = ({onNewOrder}) => {
    const menuItem = (
        <Menu.Item color="green">
            <Icon name="add" color="green"/>
            New order
        </Menu.Item>
    );

    return <NewOrderPopup trigger={menuItem} onNewOrder={onNewOrder}/>;
};

export default NewOrderMenuItem;
