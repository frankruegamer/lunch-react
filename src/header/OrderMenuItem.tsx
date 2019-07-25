import React from "react";
import OrderList from "../business/OrderList";
import Order from "../domain/Order";
import OrderService from "../service/OrderService";

interface OrderMenuItemProps {
    order?: Order;
    onOrderChange: (order: Order) => void;
}

interface OrderMenuItemState {
    orders: Order[];
}

export default class OrderMenuItem extends React.Component<OrderMenuItemProps, OrderMenuItemState> {

    constructor(props: Readonly<OrderMenuItemProps>) {
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

    componentDidUpdate(prevProps: Readonly<OrderMenuItemProps>): void {
        if (prevProps.order !== this.props.order) {
            OrderService.getLast10()
                .then(orders => this.setState({orders}));
        }
    }

    addInitialOrders(orders: Order[]): void {
        this.setState({
            orders
        });
        if (orders[0] !== undefined) {
            this.props.onOrderChange(orders[0]);
        }
    }

    onItemChange(timestamp: string): void {
        const current = this.state.orders.find(order => order.timestamp.toISOString() === timestamp);
        if (current !== undefined) {
            this.props.onOrderChange(current);
        }
    }

    render(): React.ReactNode {
        const {orders} = this.state;
        const {order} = this.props;
        if (orders.length > 0) {
            return (
                <OrderList orders={orders} onItemChange={this.onItemChange} value={order}/>
            );
        } else {
            return null;
        }
    }

}
