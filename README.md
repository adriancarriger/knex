# A fun project for Twilio messages

[![Greenkeeper badge](https://badges.greenkeeper.io/adriancarriger/knex.svg)](https://greenkeeper.io/)

## Connect to Postgres

* `docker-compose exec db /bin/bash`
* `psql -U postgres`
* `CREATE DATABASE data;`
* `\c data`

## Running the code

1. Start `docker-compose up`
1. Migrate: `knex migrate:latest`
1. Seed: `knex seed:run`

## Seed options

* `knex seed:run`
* `knex seed:run --env staging`
* `knex seed:run --env production`