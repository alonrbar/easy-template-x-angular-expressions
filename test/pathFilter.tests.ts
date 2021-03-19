import { defaultPathFilter } from 'src';

describe(nameof(defaultPathFilter), () => {

    it("identifies dot notation path", () => {
        expect(defaultPathFilter("obj._some.some2")).toBeTruthy();
    });

    it("identifies bracket notation path", () => {
        expect(defaultPathFilter("['some']['some thing'][0]")).toBeTruthy();
    });

    it("identifies mixed notation", () => {
        expect(defaultPathFilter("['some'].obj.obj2['some2']")).toBeTruthy();
    });

    it("identifies array indexes", () => {
        expect(defaultPathFilter(0)).toBeTruthy();
        expect(defaultPathFilter(123)).toBeTruthy();
        expect(defaultPathFilter("[0]")).toBeTruthy();
        expect(defaultPathFilter("[123]")).toBeTruthy();
    });

    it("returns false for string numbers", () => {
        expect(defaultPathFilter("0")).toBeFalsy();
        expect(defaultPathFilter("123")).toBeFalsy();
    });

    it("returns false for initial number", () => {
        expect(defaultPathFilter("2obj.obj")).toBeFalsy();
    });

    it("returns false for comparison", () => {
        expect(defaultPathFilter("obj1===obj2")).toBeFalsy();
    });

    it("ignores leading and trailing spaces", () => {
        expect(defaultPathFilter("  obj.some   ")).toBeTruthy();
    });

    it("returns false for middle spaces", () => {
        expect(defaultPathFilter("obj .some")).toBeFalsy();
        expect(defaultPathFilter("obj.so me")).toBeFalsy();
    });
});
