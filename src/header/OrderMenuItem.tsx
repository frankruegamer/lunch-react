import React, {useEffect, useRef, useState} from "react";
import OrderList from "../business/OrderList";
import Order from "../domain/Order";
import OrderService from "../service/OrderService";

interface OrderMenuItemProps {
    order?: Order;
    onOrderChange: (order: Order) => void;
}

const OrderMenuItem: React.FC<OrderMenuItemProps> = ({order, onOrderChange}) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const firstRender = useRef(true);

    useEffect(() => {
        OrderService.getLast10()
            .then(o => {
                setOrders(o);
                if (firstRender.current && o.length > 0) {
                    firstRender.current = false;
                    onOrderChange(o[0]);
                }
            });
    }, [order, onOrderChange]);

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
