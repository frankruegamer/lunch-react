import React from "react";
import {Icon, Menu} from "semantic-ui-react";
import Order from "../../domain/Order";
import NewOrderPopup from "./NewOrderPopup";

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
