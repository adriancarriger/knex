const knexFunction = require('knex');
const knexConfig = require('../knexfile.js');
const knex = knexFunction(knexConfig.development);

exports.up = function(knex, Promise) {
  // Messages
  const addMessages = knex.schema.createTable('messages', function(message) {
    message.text('body').notNull();
    message.string('sid').primary();
    message.dateTime('dateCreated').notNull();
    message.enum('direction', ['inbound', 'outbound']).notNull();
    message.string('from', 12).index().references('number').inTable('numbers').notNull();
    message.string('to', 12).index().references('number').inTable('numbers').notNull();
  });
  // Numbers
  const addNumbers = knex.schema.createTable('numbers', function(number) {
    number.string('number', 12).primary();
    number.dateTime('dateCreated').notNull();
  });
  // People
  const addPeople = knex.schema.createTable('people', function(person) {
    person.increments('id').primary();
    person.string('firstName');
    person.string('lastName');
    person.string('job');
    person.dateTime('dateCreated').notNull();
  });
  // Many to many => numbers to people
  const addNumbersToPeople = knex.schema.createTable('numbersToPeople', function(table) {
    table.increments('id').primary();
    table.string('number', 12).index().references('number').inTable('numbers').notNull();
    table.bigInteger('personId').index().references('id').inTable('people').notNull();
    table.dateTime('dateCreated').notNull();
  });
  return Promise.all([addMessages, addNumbers, addPeople, addNumbersToPeople]);
};

exports.down = function(knex, Promise) {
  return new Promise(resolve => {
    Promise.all([
      knex.schema.dropTableIfExists('numbersToPeople'),
      knex.schema.dropTableIfExists('messages'),
      knex.schema.dropTableIfExists('people')
    ])
    .then(() => knex.schema.dropTableIfExists('numbers'))
    .then(() => resolve());
  });
};
