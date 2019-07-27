import React from "react";
import OrderList from "./OrderList";
import Order from "../domain/Order";

interface OrderMenuItemProps {
    order?: Order;
    orders: Order[];
    onOrderChange: (order: Order) => void;
}

const OrderMenuItem: React.FC<OrderMenuItemProps> = ({order, orders, onOrderChange}) => {
    function handleItemChange(timestamp: string): void {
        const current = orders.find(o => o.timestamp.toISOString() === timestamp);
        onOrderChange(current as Order);
    }

    if (orders.length <= 0) {
        return null;
    }
    return (
        <OrderList orders={orders} onItemChange={handleItemChange} value={order}/>
    );
};

export default OrderMenuItem;
