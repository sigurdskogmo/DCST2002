export function isLeapYear(year) {
    // Oppgave 2.1
    if (year < 0) {
        throw new Error('Invalid argument: year must be an integer equal to or larger than 0');
    } 
    // Oppgave 3.1
    else if (year === null || year === undefined) {
        throw new Error('Invalid argument: year can not be null or undefined');
    }
    return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
}