import React from "react";
import {Button} from "semantic-ui-react";

interface PayButtonProps {
    payed: boolean;
    price: number;
    onPayment: () => void;
}

const PayButton: React.FC<PayButtonProps> = ({payed, price, onPayment}) => {
    if (payed) {
        return (
            <Button disabled basic floated="right" color="green">
                Payed
            </Button>
        );
    } else {
        return (
            <Button basic animated="vertical" floated="right" color="green" onClick={onPayment}>
                <Button.Content visible>Not payed</Button.Content>
                <Button.Content hidden>Pay {price.toFixed(2)} €</Button.Content>
            </Button>
        );
    }
};

export default PayButton;
