import React from "react";
import {Button, Popup, Segment} from "semantic-ui-react";
import PersonOrderPosition from "../../domain/PersonOrderPosition";
import FoodPriceGrid from "./FoodPriceGrid";

interface PersonOrderListItemProps {
    position: PersonOrderPosition;
    disableRemove?: boolean;
    onRemove: (position: PersonOrderPosition) => void;
}

const PersonOrderListItem: React.FC<PersonOrderListItemProps> = ({position, disableRemove, onRemove}) => {
    const food = position.food;
    const style = {
        border: 0,
        borderRadius: 0,
        boxShadow: "0px 0px",
        padding: 0
    };
    const removeItem = () => onRemove(position);
    return (
        <Popup
            disabled={disableRemove}
            key={position.links.self.href}
            basic
            trigger={<Segment><FoodPriceGrid {...food}/></Segment>}
            position="right center"
            mouseEnterDelay={500}
            mouseLeaveDelay={200}
            hoverable
            style={style}
        >
            <Button icon={{name: "remove"}} onClick={removeItem}/>
        </Popup>
    );
};

export default PersonOrderListItem;
