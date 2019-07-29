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
    order?: Order;
    restaurant?: Restaurant;
    person?: Person;
    onOrderChange: (order: Order) => void;
}

const AppMenu: React.FC<AppMenuProps> = ({order, restaurant, person, onOrderChange}) => {
    const personDefined = person !== undefined;
    const orderDefined = order !== undefined;
    const restaurantDefined = restaurant !== undefined;
    const [item, setItem] = useState(personDefined ? Item.me : Item.overview);

    function handleClick(event: any, {name}: MenuItemProps) {
        setItem(name as Item);
    }

    const meEnabled = personDefined && orderDefined && restaurantDefined;
    const overviewEnabled = orderDefined && restaurantDefined;
    const meActive = meEnabled && item === Item.me;
    const overviewActive = overviewEnabled && item === Item.overview;
    let mainContent;
    if (meActive) {
        mainContent = (
            <PersonOverview
                order={order as Order}
                restaurant={restaurant as Restaurant}
                person={person as Person}
                onOrderChange={onOrderChange}
            />
        );
    } else if (overviewActive) {
        mainContent = (
            <OrderOverview
                order={order as Order}
                restaurant={restaurant as Restaurant}
            />
        );
    }
    return (
        <>
            <Menu pointing secondary>
                <Menu.Item
                    name={Item.me}
                    active={meActive}
                    disabled={!meEnabled}
                    onClick={handleClick}
                />
                <Menu.Item
                    name={Item.overview}
                    active={overviewActive}
                    disabled={!overviewEnabled}
                    onClick={handleClick}
                />
            </Menu>
            {mainContent}
        </>
    );
};

export default AppMenu;
