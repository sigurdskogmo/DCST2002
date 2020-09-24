# Øving - Klient tester

Ta utgangspunkt i eksempelkoden for leksjonen: [https://gitlab.com/ntnu-dcst2002/todo-client-tests](https://gitlab.com/ntnu-dcst2002/todo-client-tests).

## Del 1

- Legg til en ekstra kolonne i databasetabellen `Tasks`: `description`
- Oppdater klient- og server-koden til å ta i bruk denne nye tabellkolonnen.
  - På klientsiden skal `description` vises i `TaskDetails`, og kunne settes og endres i `TaskNew` og `TaskEdit`
- Sletting og endring av oppgaver må implementeres denne uken også, men oppdater komponenten `TaskEdit` i stedet for `TaskList` på klientsiden denne gangen.

## Del 2

- Lag en test som åpner 3 `Alert` meldinger, og lukker den 2. meldingen. Sjekk at riktig innhold vises etter hver handling (åpning og lukking av meldinger).
- Lag to tester som sjekker at `TaskDetails` tegner riktig. Hint: start med `const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);`
  - Lag første testen med `wrapper.containsMatchingElement()` eller `wrapper.containsAllMatchingElements()`
  - Lag andre testen ved hjelp av _snapshot_.

## Del 3

- Oppnå 70% testdekning på uttrykk (`Stmts`) for `client/src/task-components.js`. En løsning kan eksempelvis gi følgende utskrift fra `npm test` i `client/`-mappen:

```
--------------------|---------|----------|---------|---------|
File | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files | 55.7 | 0 | 47.27 | 55.7 |
task-components.js | 75 | 100 | 67.74 | 75 |
widgets.js | 39.53 | 0 | 20.83 | 39.53 |
--------------------|---------|----------|---------|---------|
```

- Oppnå 70% testdekning på uttrykk for alle filene (utenom `server.js` og `config.js`) i `server/src/`-katalogen. En løsning kan eksempelvis gi følgende utskrift fra `npm test` i `server/`-mappen:

```
-----------------|---------|----------|---------|---------|
File | % Stmts | % Branch | % Funcs | % Lines |
-----------------|---------|----------|---------|---------|
All files | 84.13 | 78.95 | 87.1 | 92.86 |
app.js | 100 | 100 | 100 | 100 |
mysql-pool.js | 100 | 75 | 100 | 100 |
task-router.js | 85.71 | 100 | 73.33 | 85.71 |
task-service.js | 80 | 57.14 | 100 | 100 |
-----------------|---------|----------|---------|---------|
```
