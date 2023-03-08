# Article Web API Demo

## Table of Contents
+ [About](#about)
+ [Getting Started](#getting_started)
+ [Usage](#usage)
+ [Libraries Used](#libraries)
## About <a name = "about"></a>
This is a demo of a simple backend API using NodeJs Fastify and KnexJs.
 
 ### __Not to be used for production!__
<br>  
<br>  

## Getting Started <a name = "getting_started"></a>
Clone the project into your local or download a zipped copy of this project and extract it into any folder.

<br>  

### Prerequisites

Make sure you have the following installed.

* NodeJS and NPM with at least version v16.13.2 and above and NPM 8.15.0 and above.

To check the version:

```
node -v
```
Output:
```
v16.13.2
```
NPM:
```
npm -v
```
Output:
```
8.15.0
```
<br>  

* You also need KnexJS to populate the database:
Install with:
```
npm i -g knex
```
then
```
npx knex migrate:latest
```
to start populating the database using the migration files.
<br>  
<br>

## Installing

To install:

```
npm i
```

To run:

```
npm start
```
### Creating the Database Tables



You may use POSTMAN to test the endpoints or use the REST Client extension for Visual Studio Code

 (see folder: `./routes/http_collections/` )


## Usage <a name = "usage"></a>

Send requests via POSTMAN or any REST API clients.

## Libraries Used <a name = "libraries"></a>

(See `package.json` for the complete list of dependencies)
* Fastify
* SQLite3
* Knex
* jsonwebtoken (JWT)

