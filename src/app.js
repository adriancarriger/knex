// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('./knex-config');
const screen = require('./screen');
const knex = knexFunction(knexConfig.sqlite);

// App
screen.clear();

const query = knex.select().from('artists').where('ArtistId', '<', 10);
run(query, 'pretty');

function run(knexQuery, mode) {
  return knexQuery
    .then(data => screen.write(data, mode))
    .catch(error => console.warn(error))
    .finally(() => {
      knex.destroy();
      console.log('Done.');
    });
}
