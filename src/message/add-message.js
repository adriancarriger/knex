const knex = require('../db/db-service').connectDb();
/**
 * @param {Object} message
 */
function addMessage(message) {
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
    return knex('message').insert({
      body: message.body,
      sid: message.sid,
      datecreated: message.datecreated,
      direction: message.direction,
      from: message.from,
      to: message.to
    });
  });
}

module.exports = {
  addMessage
}
