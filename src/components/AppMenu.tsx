import React, {useState} from "react";
import {Menu, MenuItemProps} from "semantic-ui-react";
import Order from "../domain/Order";
import Person from "../domain/Person";
import Restaurant from "../domain/Restaurant";
import OrderOverview from "./overview/OrderOverview";
import PersonOverview from "./person/PersonOverview";

enum Item {
    me = "me",
    overview = "overview"
}

interface AppMenuProps {
    order: Order;
    restaurant: Restaurant;
    person: Person;
}

const AppMenu: React.FC<AppMenuProps> = ({order, restaurant, person}) => {
    const [item, setItem] = useState(Item.me);

    function handleClick(event: any, {name}: MenuItemProps) {
        setItem(name as Item);
    }

    return (
        <>
            <Menu pointing secondary>
                <Menu.Item
                    content={person.name}
                    name={Item.me}
                    active={item === Item.me}
                    onClick={handleClick}
                />
                <Menu.Item
                    content="Overview"
                    name={Item.overview}
                    active={item === Item.overview}
                    onClick={handleClick}
                />
            </Menu>
            {item === Item.me && <PersonOverview order={order} restaurant={restaurant} person={person}/>}
            {item === Item.overview && <OrderOverview restaurant={restaurant}/>}
        </>
    );
};

export default AppMenu;
