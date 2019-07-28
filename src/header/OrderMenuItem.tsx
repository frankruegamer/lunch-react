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
    // @ts-ignore
    dateFormat.i18n = {
        ...dateFormat.i18n,
        monthNames: [
            "Jan", "Feb", "März", "April", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"
        ]
    };
    return dateFormat(date, `dd. mmm${displayYears ? " yyyy" : ""} HH:MM`) + " Uhr";
}

export default OrderMenuItem;
