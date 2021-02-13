import { Tag } from 'easy-template-x';
import { resolver } from 'src/index';

describe('unit tests', () => {

    it('resolves dotted object notation', () => {
        const tag: Tag = {
            name: "$person.name.firstName",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const path = [tag];
        const data = {
            person: {
                name: {
                    firstName: "Alon",
                    lastName: "Bar"
                }
            }
        };
        const value = resolver(path, data);
        expect(value).toEqual("Alon");
    });

    it('resolves array index notation', () => {
        const tag: Tag = {
            name: "$people[0].name.firstName",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const path = [tag];
        const data = {
            people: [
                {
                    name: {
                        firstName: "Alon",
                        lastName: "Bar"
                    }
                },
                {
                    name: {
                        firstName: "Someone",
                        lastName: "Else"
                    }
                }
            ]
        };
        const value = resolver(path, data);
        expect(value).toEqual("Alon");
    });

    it('resolves a condition', () => {
        const tag: Tag = {
            name: "$person.name.lastName === 'Bar'",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const path = [tag];
        const data = {
            person: {
                name: {
                    firstName: "Alon",
                    lastName: "Bar"
                }
            }
        };
        const value = resolver(path, data);
        expect(value).toEqual(true);
    });
});
