# Client - server example

## Create databases

Create two databases `username_todo_dev` and `username_todo_test`. For detailed instructions see
https://innsida.ntnu.no/wiki/-/wiki/Norsk/Bruke+MySQL+ved+NTNU.

In both databases, create a `Tasks` table:

```sql
CREATE TABLE Tasks (
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  done BOOL,
  PRIMARY KEY(id)
);
```

## Setup database connections

You need to create two files that will contain the database connection details. These files should
not be uploaded to your git repository, and they have therefore been added to `.gitignore`.

`server/src/config.js`:

```js
// @flow

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'username_todo_dev';
process.env.MYSQL_PASSWORD = 'password';
process.env.MYSQL_DATABASE = 'username_todo_dev';
```

`server/test/config.js`:

```js
// @flow

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'username_todo_test';
process.env.MYSQL_PASSWORD = 'password';
process.env.MYSQL_DATABASE = 'username_todo_test';
```

These environment variables will be used in the `server/src/mysql-pool.js` file.

## Start server

Install dependencies and start server:

```sh
cd server
npm install
npm start
```

### Run server tests:

```sh
npm test
```

## Bundle client files to be served through server

Install dependencies and bundle client files:

```
cd client
npm install
npm start
```
