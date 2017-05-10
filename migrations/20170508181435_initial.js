const knexFunction = require('knex');
const knexConfig = require('../knexfile.js');
const knex = knexFunction(knexConfig.development);

exports.up = function(knex, Promise) {
  return Promise.all([
    // Messages
    knex.schema.createTable('message', message => {
      message.text('body').notNull();
      message.string('sid').primary();
      message.dateTime('datecreated').notNull();
      message.enum('direction', ['inbound', 'outbound']).notNull();
      message.string('from', 12).index().references('number').inTable('number').notNull();
      message.string('to', 12).index().references('number').inTable('number').notNull();
    }),
    // Numbers
    knex.schema.createTable('number', number => {
      number.string('number', 12).primary();
      number.dateTime('datecreated').notNull();
    }),
    // People
    knex.schema.createTable('person', person => {
      person.increments('id').primary();
      person.string('firstName');
      person.string('lastName');
      person.string('job');
      person.dateTime('datecreated').notNull();
    }),
    // Many to many => numbers to person
    knex.schema.createTable('numberToPerson', table => {
      table.increments('id').primary();
      table.string('number', 12).index().references('number').inTable('number').notNull();
      table.bigInteger('personId').index().references('id').inTable('person').notNull();
      table.dateTime('datecreated').notNull();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return new Promise(resolve => {
    Promise.all([
      knex.schema.dropTableIfExists('numberToPerson'),
      knex.schema.dropTableIfExists('message'),
      knex.schema.dropTableIfExists('person')
    ])
    .then(() => knex.schema.dropTableIfExists('number'))
    .then(() => resolve());
  });
};
