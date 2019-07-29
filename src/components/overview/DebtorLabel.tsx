import React from "react";
import {Icon, Label, Popup} from "semantic-ui-react";
import Person from "../../domain/Person";
import PersonOrder from "../../domain/PersonOrder";
import PriceFormatter from "../../tools/PriceFormatter";
import SemanticColorPicker from "../../tools/SemanticColorPicker";

interface DebtorLabelProps {
    personOrder: PersonOrder & { person: Person };
    onClick: (personOrder: PersonOrder) => void;
    colorPicker: SemanticColorPicker;
}

const DebtorLabel: React.FC<DebtorLabelProps> = ({personOrder, onClick, colorPicker}) => {
    function handleClick() {
        if (personOrder !== undefined) {
            onClick(personOrder);
        }
    }

    const name = personOrder.person.name;
    const label = (
        <Label as="a" color={colorPicker.get(name)} onClick={handleClick}>
            <Icon name={"x"}/>
            {name}
        </Label>
    );
    return (
        <Popup flowing trigger={label}>
            {name} has not paid for their order.
            <br/>
            Click to confirm payment of {PriceFormatter.format(personOrder.price)}.
        </Popup>
    );
};

export default DebtorLabel;
