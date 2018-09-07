# A fun project for Twilio messages

[![Dependency Status](https://img.shields.io/david/adriancarriger/knex/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/knex)
[![devDependency Status](https://img.shields.io/david/dev/adriancarriger/knex/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/knex?type=dev)

## Connect to Postgres

* `docker-compose exec db bash -c "psql -U postgres"`
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
