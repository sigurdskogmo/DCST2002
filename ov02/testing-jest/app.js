export function isLeapYear(year) {
    if (year < 0) {
        throw new Error('Invalid argument: year must be an integer equal to or larger than 0');
    } else if (year === null || year === undefined) {
        throw new Error('Invalid argument: year can not be null or undefined');
    }
    return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
}