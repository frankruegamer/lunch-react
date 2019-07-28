import * as React from "react";
import {Message} from "semantic-ui-react";

const AlreadyPayedMessage: React.FC = () => {
    return (
        <Message compact>
            You can't modify items in your order, because you have already payed.
        </Message>
    );
};

export default AlreadyPayedMessage;
