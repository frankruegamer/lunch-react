import React, {useState} from "react";
import {Button, Popup} from "semantic-ui-react";
import Order from "../domain/Order";
import Restaurant from "../domain/Restaurant";
import OrderService from "../service/OrderService";
import RestaurantList from "./RestaurantList";

interface NewOrderPopupProps {
    trigger: React.ReactNode;
    onNewOrder: (order: Order) => void;
}

const NewOrderPopup: React.FC<NewOrderPopupProps> = ({trigger, onNewOrder}) => {
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
    const [popupOpen, setPopupOpen] = useState(false);

    function handleConfirm() {
        setPopupOpen(false);
        // restaurant should be defined because the button is disabled when it is not
        OrderService.createNew(restaurant as Restaurant).then(onNewOrder);
    }

    function handleClose() {
        setPopupOpen(false);
        setRestaurant(undefined);
    }

    function handleOpen() {
        setPopupOpen(true);
    }

    return (
        <Popup
            trigger={trigger}
            on="click"
            open={popupOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            flowing
        >
            <RestaurantList handleRestaurantChange={setRestaurant}/>
            <Button disabled={restaurant === undefined} color={"green"} onClick={handleConfirm}>Create</Button>
        </Popup>
    );
};

export default NewOrderPopup;
