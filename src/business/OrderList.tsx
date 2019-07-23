import dateFormat from "dateformat";
import React from "react";
import {Dropdown, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import Order from "../domain/Order";

interface OrderListProps {
    orders: Order[];
    onItemChange: (timestamp: string) => void;
    value?: Order;
}

export default class OrderList extends React.Component<OrderListProps, object> {

    static toOption(order?: Order): DropdownItemProps {
        if (order === undefined) {
            return {value: undefined};
        }
        const timeStampString = order.timestamp.toISOString();
        return {key: timeStampString, text: dateFormat(order.timestamp, "yyyy-mm-dd HH:MM:ss"), value: timeStampString};
    }

    constructor(props: Readonly<OrderListProps>) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any, data: DropdownProps): void {
        this.props.onItemChange(data.value as string);
    }

    render(): React.ReactNode {
        const {orders, value} = this.props;
        const options = orders.map(OrderList.toOption);
        const option = OrderList.toOption(value).value;
        return <Dropdown options={options} onChange={this.handleChange} value={option}/>;
    }

}
