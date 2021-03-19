import { isNumber } from './utils';

export type PathFilter = (part: string | number) => boolean;

const simpleToken = "[a-zA-z_]\\w*";

const bracketToken = `\\[("[^"]+"|'[^']+'|\\d+)\\]`;

const token = `((${simpleToken})|(${bracketToken}))`;

const defaultFilterRegex = new RegExp(`^\\s*${token}(\\.${simpleToken}|${bracketToken})*\\s*$`);

/**
 * The default path filters returns true for js object paths and false for other
 * js expressions.
 */
export const defaultPathFilter : PathFilter = (part: string | number) => {
    if (isNumber(part)) {
        return true;
    }
    return defaultFilterRegex.test(part);
};
