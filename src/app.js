// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('../knexfile.js');
const screen = require('./screen');
const knex = knexFunction(knexConfig.development);

// App
screen.clear();

const query = knex('messages')
  .select().limit(2);

run(query, 'pretty');

/**
 * @method run
 * @param {string} mode
 */
function run(knexQuery, mode) {
  knexQuery
    .then(data => screen.write(data, mode))
    .catch(error => console.warn(error))
    .finally(() => {
      knex.destroy();
      console.log('Done.');
    });
}
