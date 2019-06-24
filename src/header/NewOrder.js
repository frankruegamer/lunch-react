import React from "react";
import {Icon, Menu} from "semantic-ui-react";

const NewOrder = () => {
    return (
        <Menu.Item as='a' color='green'>
            <Icon name='add' color='green'/>
            New order
        </Menu.Item>
    )
};

export default NewOrder;
