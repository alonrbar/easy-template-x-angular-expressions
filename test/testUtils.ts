export function removeDuplicateWhitespace(str: string): string {
    // https://stackoverflow.com/questions/7764319/how-to-remove-duplicate-white-spaces-in-a-string#7764370
    return str.replace(/\s+/g,' ');
}
