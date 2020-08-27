import { isLeapYear } from './app.js';

describe('A year is a leap year', () => {
    // Oppgave 1
    test.each([2020, 1820, 1960, 2020])('Year is divisible by 4 but not by 100', (year) => {
        expect(isLeapYear(year)).toBeTruthy();
    });
    
    test('Year is divisible by 400', () => {
        expect(isLeapYear(2000)).toBeTruthy();
    });
});

describe('A year is not a leap year', () => {
    test('Year is not divisible by 4', () => {
        expect(isLeapYear(1981)).toBeFalsy();
    });

    test('Year is divisible by 100 but not by 400', () => {
       expect(isLeapYear(2100)).toBeFalsy(); 
    });
});

describe('A year is not supported', () => {
    test('Year is negative', () => {
        // When expecting a function to throw an error, 
        // we need an anonymous wrapper function
        expect(() => {
            isLeapYear(-1);
        }).toThrow('Invalid argument: year must be an integer equal to or larger than 0');
    });

    test.each([null, undefined])('Year is null or undefined', (year) => {
        expect(() => {
            isLeapYear(year);
        }).toThrow('Invalid argument: year can not be null or undefined');
    });
});