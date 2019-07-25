import * as React from "react";
import {useEffect, useState} from "react";
import {Dropdown, DropdownProps} from "semantic-ui-react";
import Person from "../domain/Person";
import PersonService from "../service/PersonService";

interface PersonMenuItemProps {
    onPersonChange: (person: Person) => void;
}

const PersonMenuItem: React.FC<PersonMenuItemProps> = ({onPersonChange}) => {
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        PersonService.getAll()
            .then(setPersons);
    }, []);

    function createAccount(e: any, {value}: DropdownProps) {
        PersonService.createNew(value as string)
            .then(onPersonChange);
    }

    function handleChange(e: any, {value}: DropdownProps) {
        const person = persons.find(p => p.name === value);
        // person will not be undefined as value comes from Dropdown
        onPersonChange(person as Person);
    }

    const options = persons.map(p => ({key: p.name, text: p.name, value: p.name}));
    return (
        <Dropdown
            error
            item
            placeholder="Please log in"
            allowAdditions
            additionLabel="Create "
            additionPosition="bottom"
            selection
            search
            options={options}
            onAddItem={createAccount}
            onChange={handleChange}
        />
    );
};

export default PersonMenuItem;
