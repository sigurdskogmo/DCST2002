# Øving: Docker og Continuous Integration

## Del 1
Installer docker på PC'en din. Se [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) for installasjonsinstruksjoner til ulike plattformer.

Lag en web-applikasjon som lar brukeren skrive og kjøre kildekode i et gitt programmeringsspråk. Utskriften av den kjørte kildekoden skal vises på nettsiden. Bruk gjerne [https://gitlab.com/ntnu-dcst2002/todo-client-tests](https://gitlab.com/ntnu-dcst2002/todo-client-tests) som utgangspunkt.

Eksempel løsning:

 

Merk at et program alltid har følgende mulige utskrifter og retur verdi:

* Standard output: vanlig utskrift, for eksempel gjennom ```console.log()```
* Standard error: feilmeldinger, for eksempel gjennom ```console.error()```
* Exit status: et tall satt til ```0``` om programmet fullførte vellykket, eller ```> 0``` hvis ikke.
Siden kildekoden som skal kjøres teoretisk sett kan gjøre hva som helst, er det viktig at kildekoden kjøres i en docker container. Selve docker containeren kan kjøres med [```childProcess.spawn()```](https://nodejs.org/api/child_process.html#child_process_child_process) på serversiden.

Frivillig:

* La brukeren kunne velge ett av flere programmeringsspråk
* Lag tester

## Del 2
Sett opp Continuous Integration (gjennom en ```.gitlab-ci.yml``` fil) for løsningen du lagde i forrige øving.

Kjøring av servertestene med database oppkobling krever at du først setter opp miljøvariabler:

<img src="https://ntnu.blackboard.com/bbcswebdav/pid-1138432-dt-content-rid-30705514_1/xid-30705514_1" />

```yml
variables:
  # Configure server/src/mysql-pool.js
  MYSQL_HOST: localhost
  MYSQL_USER: root # Docker commands are run as root
  MYSQL_PASSWORD: '' # Default root password is empty string
  MYSQL_DATABASE: todo-test
```
Deretter må du installere, starte og sette opp en MySQL server før du skal kjøre testene, for eksempel:

```yml
test:
  stage: test
  script:
    - apt-get update
    - apt-get -y upgrade
    - apt-get -y install mysql-server
    - service mysql start
    # Workaround from https://github.com/mysqljs/mysql/issues/1507#issuecomment-242885003
    - echo "UPDATE user SET authentication_string=password(''), plugin='mysql_native_password' WHERE
      user='root';" | mysql mysql
    - mysqladmin create $MYSQL_DATABASE
    # Create database table
    - echo "CREATE TABLE Tasks (id INT NOT NULL AUTO_INCREMENT, title TEXT NOT NULL, done BOOL
      DEFAULT false, PRIMARY KEY(id));" | mysql $MYSQL_DATABASE
```
Du kan også opprette en tom ```config.js``` fil siden denne filen kreves av ```npm test``` kommandoen på serversiden. Alternativt kan du ta bort ```--setupFiles ./test/config``` argumentet i ```server/package.json```.
