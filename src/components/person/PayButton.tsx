import React from "react";
import {Button} from "semantic-ui-react";

interface PayButtonProps {
    paid: boolean;
    price: number;
    onPayment: () => void;
}

const PayButton: React.FC<PayButtonProps> = ({paid, price, onPayment}) => {
    if (paid) {
        return (
            <Button disabled basic floated="right" color="green">
                Paid
            </Button>
        );
    } else {
        return (
            <Button basic animated="vertical" floated="right" color="green" onClick={onPayment}>
                <Button.Content visible>Not paid</Button.Content>
                <Button.Content hidden>Pay {price.toFixed(2)} €</Button.Content>
            </Button>
        );
    }
};

export default PayButton;
