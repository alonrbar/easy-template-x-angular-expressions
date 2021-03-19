import { TemplateHandler } from 'easy-template-x';
import * as fs from 'fs';
import { createResolver } from 'src';
import { removeDuplicateWhitespace } from './testUtils';
const expressions = require('angular-expressions');

describe('fixture tests', () => {

    it('works as expected', async () => {
        const handler = new TemplateHandler({
            scopeDataResolver: createResolver()
        });
        const template = fs.readFileSync("./test/fixtures/test.docx");
        const templateText = await handler.getText(template);
        expect(removeDuplicateWhitespace(templateText)).toEqual([
            "{# myLoop}",
            "{# casing == “upper”}",
            "{item.name | upper}",
            "{/}",
            "{# casing == “lower”}",
            "{item.name | lower}",
            "{/}",
            "----",
            "{/}"
        ].join(""));

        const data = {
            "myLoop":[
                {
                    casing: "upper",
                    item: {
                        name: "Bla"
                    }
                },
                {
                    casing: "lower",
                    item: {
                        name: "Some"
                    }
                },
            ]
        };

        expressions.filters.upper = (input: string) => (input || "").toUpperCase();
        expressions.filters.lower = (input: string) => (input || "").toLowerCase();
        const doc = await handler.process(template, data);

        const docText = await handler.getText(doc);
        expect(removeDuplicateWhitespace(docText)).toEqual([
            "BLA",
            "----",
            "some",
            "----",
        ].join(""));

        const docXml = await handler.getXml(doc);
        expect(docXml).toMatchSnapshot();

        // fs.writeFileSync('/temp/angular parser - out.docx', doc);
    });
});
