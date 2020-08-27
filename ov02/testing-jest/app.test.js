import { isLeapYear } from './app.js';

describe('A year is a leap year', () => {
    test('Year is divisible by 4 but not by 100', () => {
        expect(isLeapYear(2020)).toBeTruthy();
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