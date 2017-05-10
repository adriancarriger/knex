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

// App
screen.clear();




connectDb();

run(
  PersonModel
    .query()
    .select('*')
    .joinRelation('numbers.outgoingMessages', 'numbers.incomingMessages')
    .orderBy('numbers:outgoingMessages.datecreated')
    // .eager('numbers.messages')
    ,

  'pretty');
// run(NumberModel.query(), 'pretty');








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
