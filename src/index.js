// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('../knexfile.js');
const screen = require('./util/screen');
const knex = knexFunction(knexConfig.development);

const { connectDb } = require('./db/db-service')
const { PersonModel } = require('./person/person-model');
const { NumberModel } = require('./number/number-model');
const { MessageModel } = require('./message/message-model');

// App setup
screen.clear();
connectDb();

// Query
const query = PersonModel
  .query()
  .select('firstName', 'direction', 'body', 'numbers:message.datecreated')
  .joinRelation('[numbers.outgoingMessages, numbers.incomingMessages]', {
    aliases: { incomingMessages: 'message' }
  })
  .orderBy('numbers:message.datecreated').debug();

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
