import React, {useEffect, useState} from "react";
import {Icon, Label, Popup} from "semantic-ui-react";
import Order from "../../domain/Order";
import Person from "../../domain/Person";
import PersonOrder from "../../domain/PersonOrder";
import PersonOrderService from "../../service/PersonOrderService";
import SemanticColorPicker from "../../tools/SemanticColorPicker";

interface DebtorLabelProps {
    order: Order;
    person: Person;
    onClick: (personOrder: PersonOrder) => void;
    colorPicker: SemanticColorPicker;
}

const DebtorLabel: React.FC<DebtorLabelProps> = ({order, person, onClick, colorPicker}) => {
    const [personOrder, setPersonOrder] = useState<PersonOrder>();

    useEffect(() => {
        PersonOrderService.getByPerson(order, person)
            .then(setPersonOrder);
    }, [order, person]);

    function handleClick() {
        if (personOrder !== undefined) {
            onClick(personOrder);
        }
    }

    const name = person.name;
    const label = (
        <Label as="a" color={colorPicker.get(name)} onClick={handleClick}>
            <Icon name={"x"}/>
            {name}
        </Label>
    );
    let price = 0;
    if (personOrder !== undefined) {
        price = personOrder.price;
    }
    return (
        <Popup flowing trigger={label}>
            {name} has not paid for their order.
            <br/>
            Click to confirm payment of {price.toFixed(2)} €.
        </Popup>
    );
};

export default DebtorLabel;
