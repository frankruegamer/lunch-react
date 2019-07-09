import React from "react";
import {Menu} from "semantic-ui-react";
import OrderList from "../business/OrderList";
import OrderService from "../service/OrderService";
import Order from "../domain/Order";

interface OrderMenuItemState {
    orders: Order[]
    current?: Order
}

export default class OrderMenuItem extends React.Component<object, OrderMenuItemState> {

    constructor(props: Readonly<object>) {
        super(props);
        this.state = {
            orders: []
        };
        this.addInitialOrders = this.addInitialOrders.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
    }

    componentDidMount(): void {
        OrderService.getLast10()
            .then(this.addInitialOrders);
    }

    addInitialOrders(orders: Order[]): void {
        orders = orders.map(order => {
            order.timestamp = new Date(order.timestamp);
            return order
        });
        this.setState({
            orders: orders,
            current: orders[0]
        });
    }

    onItemChange(timestamp: string): void {
        const current = this.state.orders.find(order => order.timestamp.toISOString() === timestamp);
        this.setState({
            current: current
        });
    }


    render(): React.ReactNode {
        const {orders, current} = this.state;
        if (orders.length > 0) {
            return (
                <Menu.Item>
                    <OrderList orders={orders} onItemChange={this.onItemChange} value={current}/>
                </Menu.Item>
            )
        } else {
            return null;
        }
    }

}