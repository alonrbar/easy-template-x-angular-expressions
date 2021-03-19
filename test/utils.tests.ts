import { strEscape } from 'src';

describe(nameof(strEscape), () => {

    it("escapes double quotes", () => {
        expect(strEscape(`"something"`)).toEqual("\\\"something\\\"");
    });
});
