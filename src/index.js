// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('../knexfile.js');
const screen = require('./util/screen');
const knex = knexFunction(knexConfig.development);

const { connectDb } = require('./db/db-service')
const { MessageModel } = require('./message/message-model');

// App setup
screen.clear();
connectDb();

// Query
const query = MessageModel
  .query()
  .select('body', 'direction', 'message.datecreated', 'from:people.firstName as from', 'to:people.firstName as to')
  .joinRelation('[from.people, to.people]')
  .debug();

// Run query
run( query, 'pretty');

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
