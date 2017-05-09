const knexFunction = require('knex');
const knexConfig = require('../knexfile.js');
const knex = knexFunction(knexConfig.development);

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(message) {
      message.text('body').notNull();
      message.string('sid').primary();
      message.dateTime('dateCreated').notNull();
      message.enum('direction', ['inbound', 'outbound']).notNull();
      message.string('from', 12).notNull();
      message.string('to', 12).notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
