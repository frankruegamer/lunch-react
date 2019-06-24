import React from "react";
import {Dropdown} from "semantic-ui-react";

export default class OrderList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {orders: [], current: ''};
        this.onItemChange = this.onItemChange.bind(this);
        this.addInitialOrders = this.addInitialOrders.bind(this);
    }

    static toOption(order) {
        const timeStampString = order.timestamp.toISOString();
        return {key: timeStampString, text: order.timestamp.toLocaleString(), value: timeStampString}
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/orders/search/last10")
            .then(r => r.json())
            .then(data => data._embedded.orders)
            .then(this.addInitialOrders);
    }

    addInitialOrders(orders) {
        orders = orders.map(order => {
            order.timestamp = new Date(order.timestamp);
            return order
        });
        this.setState({
            orders: orders,
            current: OrderList.toOption(orders[0]).value
        });
    }

    onItemChange(event, data) {
        this.setState({current: data.value});
    }

    render() {
        const {orders, current} = this.state;
        const options = orders.map(OrderList.toOption);
        return <Dropdown options={options} value={current} onChange={this.onItemChange}/>
    }

}