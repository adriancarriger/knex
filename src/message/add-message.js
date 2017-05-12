'use strict';

const knex = require('../db/db-service').connectDb();
/**
 * @param {Object} message
 */
function addMessage(message) {
  if (!message.dateSent) { return; }
  // Add numbers
  return Promise.all(
    [message.to, message.from].map(number => {
      return knex.raw(
        'INSERT INTO number (number, "datecreated") VALUES (?, now()) ON CONFLICT DO NOTHING',
        number
      );
    })
  )
  // Add message
  .then(() => {
    const direction = message.direction === 'outbound-api' ? 'outbound' : message.direction;
    return knex('message').insert({
      body: message.body,
      sid: message.sid,
      datecreated: message.dateSent, // dateSent is camelCased to match Twilio's api
      direction: direction,
      from: message.from,
      to: message.to
    });
  });
}

module.exports = {
  addMessage
};
