import { describe, expect, it } from 'vitest';
import { strEscape } from 'src';

describe(strEscape, () => {

    it("escapes double quotes", () => {
        expect(strEscape(`"something"`)).toEqual("\\\"something\\\"");
    });
});
