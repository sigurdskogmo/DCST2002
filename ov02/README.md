# Øving: Programvaretesting

_Denne øvingen bygger på koden som gjennomgås i leksjonen om [programvaretesting](https://folk.ntnu.no/olso/wu/testing/testing.html). Kildekoden kan
lastes ned direkte fra [gitlab.com](https://gitlab.com/ntnu-dcst2002/testing-jest), men vi anbefaler at du utfører stegene under “Enhetstesting med
Jest” fra start til slutt, da vi tror dette vil gi et bedre utgangspunkt for videre arbeid_

## Oppgave 1
Den første testen i “app.test.js” – ```Year is divisible by 4 but not by 100``` – sjekker kun mot
ett år. Utvid testen slik at den sjekker mot årene 1820, 1960 og 2020. Hint: Jest tilbyr en funksjon kalt
```test.each(…)``` som du kan bruke.

## Oppgave 2
Vi ønsker å begrense funksjonen vår til å kun støtte år fra og med 0. Alle negative tall skal derfor
tolkes som ugyldig input. I denne oppgaven skal du lage en test som verifiserer denne betingelsen.
Gjør følgende:

1. Forbedre ```isLeapYear(year)``` slik at funksjonen feiler grasiøst med negative tall som input. Hvis
```year``` er et negativt tall skal funksjonen [kaste et Error-objekt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) med teksten 'Invalid argument:
year must be an integer equal to or larger than 0'.
2. Lag en test som verifiserer at ```isLeapYear(year)``` faktisk kaster Error-objektet når input er et
negativt heltall.

## Oppgave 3
For at funksjonen vår skal være ekstra robust bør den også håndtere når ```year``` er ```null``` eller
```undefined```:
1. Endre ```isLeapYear(year)``` slik at den kaster et Error-objekt dersom input er ```null``` eller
```undefined```.
2. Lag en test som verifiserer at funksjonen faktisk kaster Error-objektet når input er ```null``` eller
```undefined```.

## Oppgave 4
Testene vi laget i oppgave 2 og 3 hører logisk sammen. Bruk Jest sin ```describe``` for å lage en ny
gruppering kalt “A year is not supported” som favner de to testene.