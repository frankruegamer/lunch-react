import dateFormat from "dateformat";
import React from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import Order from "../domain/Order";

interface OrderDropdownProps {
    orders: Order[];
    onItemChange: (timestamp: string) => void;
    value?: Order;
}

const OrderDropdown: React.FC<OrderDropdownProps> = ({onItemChange, orders, value}) => {
    function handleChange(event: any, data: DropdownProps): void {
        onItemChange(data.value as string);
    }

    const options = orders.map(toOption);
    const option = toOption(value).value;
    return <Dropdown item lazyLoad options={options} onChange={handleChange} value={option}/>;
};

function toOption(order?: Order): DropdownItemProps {
    if (order === undefined) {
        return {value: undefined};
    }
    const timeStampString = order.timestamp.toISOString();
    return {key: timeStampString, text: dateFormat(order.timestamp, "yyyy-mm-dd HH:MM:ss"), value: timeStampString};
}

export default OrderDropdown;
