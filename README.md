# A fun project for Twilio message

## Running the code

1. Start `docker-compose up`
1. Migrate: `knex migrate:latest`
1. Seed: `knex seed:run`

## Connect to Postgres

* `docker-compose exec db /bin/bash`
* `psql -U postgres`

## More

* `knex seed:run`
* `knex seed:run --env staging`
* `knex seed:run --env production`