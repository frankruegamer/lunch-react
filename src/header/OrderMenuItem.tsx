import dateFormat from "dateformat";
import React from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import Order from "../domain/Order";

interface OrderMenuItemProps {
    order?: Order;
    orders: Order[];
    onOrderChange: (order: Order) => void;
}

const OrderMenuItem: React.FC<OrderMenuItemProps> = ({order, orders, onOrderChange}) => {
    function handleChange(event: any, {value}: DropdownProps): void {
        const selectedOrder = orders.find(o => getIdentifier(o) === value);
        onOrderChange(selectedOrder as Order);
    }

    if (order === undefined || orders.length <= 0) {
        return null;
    }
    return <Dropdown
        item
        lazyLoad
        options={orders.map(toOption)}
        value={toOption(order).value}
        onChange={handleChange}
    />;
};

function getIdentifier(order: Order) {
    return order.links.self.href;
}

function toOption(order: Order): DropdownItemProps {
    const identifier = getIdentifier(order);
    return {key: identifier, text: format(order.timestamp), value: identifier};
}

function format(date: Date) {
    return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
}

export default OrderMenuItem;
