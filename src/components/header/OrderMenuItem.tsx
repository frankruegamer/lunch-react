import React from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import Order from "../../domain/Order";

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
        value={getIdentifier(order)}
        options={toOptions(orders)}
        onChange={handleChange}
    />;
};

function getIdentifier(order: Order) {
    return order.links.self.href;
}

function toOptions(orders: Order[]): DropdownItemProps[] {
    const years = orders.map(o => o.timestamp.getFullYear());
    const displayYears = !years.every(y => y === years[0]);
    return orders.map(order => {
        const identifier = getIdentifier(order);
        return {key: identifier, text: format(order.timestamp, displayYears), value: identifier};
    });
}

function format(date: Date, displayYears: boolean) {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        month: "short",
    };
    if (displayYears) {
        options.year = "numeric";
    }
    return new Intl.DateTimeFormat("de-DE", options).format(date);
}

export default OrderMenuItem;
