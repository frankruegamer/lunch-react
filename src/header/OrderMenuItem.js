import React from "react";
import {Menu} from "semantic-ui-react";
import OrderList from "../business/OrderList";
import OrderService from "../service/OrderService";

export default class OrderMenuItem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            orders: []
        };
        this.addInitialOrders = this.addInitialOrders.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
    }

    componentDidMount() {
        OrderService.getLast10()
                    .then(this.addInitialOrders);
    }

    addInitialOrders(orders) {
        orders = orders.map(order => {
            order.timestamp = new Date(order.timestamp);
            return order
        });
        this.setState({
            orders: orders,
            current: orders[0]
        });
    }

    onItemChange(timestamp) {
        const current = this.state.orders.find(order => order.timestamp.toISOString() === timestamp);
        this.setState({
            current: current
        });
    }

    render() {
        const {orders, current} = this.state;
        if (orders.length <= 0) {
            return null;
        }
        return (
            <Menu.Item>
                <OrderList orders={orders} onItemChange={this.onItemChange} value={current}/>
            </Menu.Item>
        )
    }
}