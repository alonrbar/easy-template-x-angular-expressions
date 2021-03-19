import { Tag } from 'easy-template-x';
import { AngularResolver } from 'src/index';

describe(nameof(AngularResolver), () => {

    it('resolves dotted object notation', () => {
        const tag: Tag = {
            name: "person.name.firstName",
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
        const resolver = new AngularResolver();
        const value = resolver.resolve({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual("Alon");
    });

    it('resolves array index notation', () => {
        const tag: Tag = {
            name: "people[0].name.firstName",
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
        const resolver = new AngularResolver();
        const value = resolver.resolve({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual("Alon");
    });

    it('resolves a condition', () => {
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
        const resolver = new AngularResolver();
        const value = resolver.resolve({
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
        const resolver = new AngularResolver({
            requiredPrefix: false
        });
        const value = resolver.resolve({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });
        expect(value).toEqual(true);
    });

    it('works with required prefix', () => {
        const tag: Tag = {
            name: "$ person.name.lastName === 'Bar'",
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
        const resolver = new AngularResolver({
            requiredPrefix: "$"
        });
        const value = resolver.resolve({
            path: [tag],
            strPath: [tag.name],
            data: data,
        });

        expect(value).toEqual(true);
    });
});
