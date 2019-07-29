import * as React from "react";
import {Message} from "semantic-ui-react";

const AlreadyPaidMessage: React.FC = () => {
    return (
        <Message compact>
            You can't modify items in your order, because you have already paid.
        </Message>
    );
};

export default AlreadyPaidMessage;
