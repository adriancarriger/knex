const { connectDb } = require('./db/db-service');
const { run } = require('./dev/dev');
const { MessageModel } = require('./message/message-model');
const knexConfig = require('../knexfile.js');

// Connect to db
const knex = connectDb();

// Query
const query = MessageModel
  .query()
  .select('message.sid', 'body', 'direction', 'message.datecreated', 'from:people.firstName as from', 'from.number as fromNumber', 'to:people.firstName as to')
  .leftOuterJoinRelation('[from.people, to.people]')
  .orderBy('message.datecreated');

// Run query
run( query, 'pretty');
