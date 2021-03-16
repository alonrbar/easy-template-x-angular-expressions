import { TemplateHandler } from 'easy-template-x';
import * as fs from 'fs';
import { createResolver } from 'src';
import { removeDuplicateWhitespace } from './testUtils';
const expressions = require('angular-expressions');

describe('unit tests', () => {

    it('works on templates', async () => {
        const handler = new TemplateHandler({
            scopeDataResolver: createResolver()
        });
        const template = fs.readFileSync("./test/fixtures/test.docx");
        const templateText = await handler.getText(template);
        expect(removeDuplicateWhitespace(templateText)).toEqual([
            "{#my loop}",
            "{#$myCondition == 1}",
            "Condition is 1",
            "{/}",
            "{#$myCondition == 2}",
            "Condition is 2",
            "{/}",
            "{$item.name | upper}",
            "----",
            "{/}"
        ].join(""));

        const data = {
            "my loop":[
                {
                    myCondition: 1,
                    item: {
                        name: "Bla"
                    }
                },
                {
                    myCondition: 2,
                    item: {
                        name: "Some"
                    }
                },
            ]
        };

        expressions.filters.upper = (input: string) => (input || "").toUpperCase();
        const doc = await handler.process(template, data);

        const docText = await handler.getText(doc);
        expect(removeDuplicateWhitespace(docText)).toEqual([
            "Condition is 1",
            "BLA",
            "----",
            "Condition is 2",
            "SOME",
            "----",
        ].join(""));

        const docXml = await handler.getXml(doc);
        expect(docXml).toMatchSnapshot();

        // fs.writeFileSync('/temp/angular parser - out.docx', doc);
    });
});
