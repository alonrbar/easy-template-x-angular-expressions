import { Tag } from 'easy-template-x';
import { createResolver } from 'src/index';

describe('unit tests', () => {

    it('resolves dotted object notation', () => {
        const tag: Tag = {
            name: "$person.name.firstName",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const data = {
            person: {
                name: {
                    firstName: "Alon",
                    lastName: "Bar"
                }
            }
        };
        const resolver = createResolver();
        const value = resolver({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual("Alon");
    });

    it('resolves array index notation', () => {
        const tag: Tag = {
            name: "$people[0].name.firstName",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
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
        const resolver = createResolver();
        const value = resolver({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual("Alon");
    });

    it('resolves a condition', () => {
        const tag: Tag = {
            name: "$person.name.lastName === 'Bar'",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const data = {
            person: {
                name: {
                    firstName: "Alon",
                    lastName: "Bar"
                }
            }
        };
        const resolver = createResolver();
        const value = resolver({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual(true);
    });

    it('works with no required prefix', () => {
        const tag: Tag = {
            name: "person.name.lastName === 'Bar'",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const data = {
            person: {
                name: {
                    firstName: "Alon",
                    lastName: "Bar"
                }
            }
        };
        const resolver = createResolver({
            requiredPrefix: false
        });
        const value = resolver({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual(true);
    });

    it('works with custom required prefix', () => {
        const tag: Tag = {
            name: "*** person.name.lastName === 'Bar'",
            disposition: null,
            rawText: null,
            xmlTextNode: null
        };
        const data = {
            person: {
                name: {
                    firstName: "Alon",
                    lastName: "Bar"
                }
            }
        };
        const resolver = createResolver({
            requiredPrefix: "***"
        });
        const value = resolver({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual(true);
    });
});
