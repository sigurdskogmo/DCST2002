# Øving - Testing av REST-ressurser

_I denne øvingen skal du ta utgangspunkt i kodeeksemplet **todo-api-v2-with-tests**. Kildekoden kan
lastes ned direkte fra [gitlab.com](https://gitlab.com/ntnu-dcst2002/todo-api-v2-with-tests). Før du begynner på oppgavene må du passe på at
databaseløsningen er på plass. Du kan lese mer om hvordan du setter opp databasen i leksjonen
[Testing av REST\_ressurser.](https://gitlab.com/ntnu-dcst2002/todo-api-v2-with-tests)_

## Oppgave 1

I “todo-api-**mock**.test.js” er det definert ni tester, men kun én av testene er ferdig implementert. I
oppgave 1 skal du fullføre de ufullstendige testene ved å bruke mocking.

Tips:

* Fjern ```.skip``` for å få Jest til å plukke opp og kjøre testene.
* ```Promise.resolve(value)``` og ```Promise.reject(value)``` er nyttige funksjoner når du skal
mocke.

## Oppgave 2 (frivillig)
Testene i “todo-api-**db**.test.js” mangler sjekk av feiltilfeller. Funksjonsignaturene eksisterer, men er
tomme. Fullfør testene.