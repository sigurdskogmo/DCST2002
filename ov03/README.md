# Øving - REST

_Før du gjør denne øvingen bør du ha sett på eksemplet fra leksjonen om [REST](https://folk.ntnu.no/olso/wu/rest/rest.html). Kildekoden kan lastes
ned direkte fra [gitlab.com](https://gitlab.com/ntnu-dcst2002/todo-api), men vi anbefaler at du gjennomfører stegene under “REST API med Node
og Express”, da vi tror dette vil gi et godt grunnlag for videre arbeid._

REST APIet fra leksjonen definerer noen enkle endepunkter for en Todo-app:

<table>
    <tr>
        <th>Metode</th>
        <th>Endepunkt</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/tasks</td>
        <td>Hent alle oppgaver</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/tasks/:id</td>
        <td>Hent en gitt oppgave</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/tasks</td>
        <td>Lag en ny oppgave</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1/tasks/:id</td>
        <td>Slett en gitt oppgave</td>
    </tr>
</table>

I denne øvinga skal du utvide/endre APIet slik at det støtter lister. En liste er ganske enkelt en samling
med oppgaver. For enkelhets skyld gjør vi det slik at en oppgave bare kan tilhøre én bestemt liste.

Det nye APIet skal tilby følgende endepunkter:

<table>
    <tr>
        <th>Metode</th>
        <th>Endepunkt</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/lists/:listId</td>
        <td>Hent en bestemt liste</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/lists</td>
        <td>Lag en ny liste</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1/lists/:listId</td>
        <td>Slett en gitt liste og dens oppgaver</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/lists/:listId/tasks</td>
        <td>Hent alle oppgaver for en gitt liste</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/lists/:listId/tasks/:taskId</td>
        <td>Hent en bestemt oppgave for en gitt liste</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/lists/:listId/tasks</td>
        <td>Lag en ny oppgave for en gitt liste</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1/lists/:listId/tasks/:taskId</td>
        <td>Slett en gitt oppgave i en bestemt liste</td>
    </tr>
</table>

Tips:

* Det kan være lurt å representere lister og oppgaver som objekter. Siden en oppgave bare skal
tilhøre én bestemt liste kan vi legge ansvaret for koblingen mellom de to på oppgave-objektet.
Forslag til datamodell: En liste består av en unik id og en tittel, mens en oppgave har følgende
attributter: en id som entydig identifiserer oppgaven, en tittel, et flagg som forteller oss om
oppgaven er ferdig eller ikke, samt en referanse til listen den tilhører.
* Hvis vi legger alle endepunktene i “app.js” kan koden fort bli uoversiktlig. Det er mulig å
modularisere endepunktene ved å bruke [express.Router](https://expressjs.com/en/guide/routing.html).
* Listene og oppgavene kan fint lagres i en dummy-database (akkurat som i eksempelet). Det er
ikke nødvendig å persistere i en ekte database for denne øvingen.

Lykke til!