# A fun project for Twilio messages

## Running the code

1. Start `docker-compose up`
1. Migrate: `knex migrate:latest`
1. Seed: `knex seed:run`

## Connect to Postgres

* `docker-compose exec db /bin/bash`
* `psql -U postgres`