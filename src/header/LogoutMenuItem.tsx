import React from "react";
import {Menu, Popup} from "semantic-ui-react";

interface LogoutMenuItemProps {
    onLogout: () => void;
}

const LogoutMenuItem: React.FC<LogoutMenuItemProps> = ({onLogout}) => {
    const item = <Menu.Item as="a" icon={{name: "sign-out", color: "red"}} onClick={onLogout}/>;
    return (
        <Popup position="bottom right" trigger={item}>Logout</Popup>
    );
};

export default LogoutMenuItem;
