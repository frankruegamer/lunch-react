import React from "react";
import {Dropdown} from "semantic-ui-react";
import * as dateformat from "dateformat";

export default class OrderList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }

    static toOption(order) {
        const timeStampString = order.timestamp.toISOString();
        return {key: timeStampString, text: dateformat(order.timestamp, "yyyy-MM-dd HH:MM:ss"), value: timeStampString}
    }

    handleChange(event, data) {
        this.props.onItemChange(data.value);
    }

    render() {
        const {orders, value} = this.props;
        const options = orders.map(OrderList.toOption);
        let option = OrderList.toOption(value).value;
        return <Dropdown options={options} onChange={this.handleChange} value={option}/>
    }

}