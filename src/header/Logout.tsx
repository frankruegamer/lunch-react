import React from "react";
import {Menu, Popup} from "semantic-ui-react";

const Logout: React.FC = () => {
    const item = <Menu.Item as='a' icon={{name: 'sign-out', color: 'red'}} position='right'/>;
    return (
        <Popup position='bottom right' trigger={item}>Logout</Popup>
    )
};

export default Logout;