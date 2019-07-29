import * as React from "react";
import {Header, Icon, Segment} from "semantic-ui-react";

const NoFoodPlaceholder: React.FC = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="food"/>
                No food has been added for this order.
            </Header>
        </Segment>
    );
};

export default NoFoodPlaceholder;
