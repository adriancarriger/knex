// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('./knex-config');
const screen = require('./screen');
const knex = knexFunction(knexConfig.pg);

// App
screen.clear();

const query = knex.select().from('tests');

run(query, 'pretty');
// run(query2, 'pretty');
/**
 * @method run
 * @param {string} mode
 */
function run(knexQuery, mode) {
  knexQuery
    .then(data => screen.write(data, mode))
    .catch(error => console.warn(error))
    .finally(() => {
      // knex.destroy();
      console.log('Done.');
    });
}
