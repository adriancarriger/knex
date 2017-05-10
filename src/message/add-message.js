const knex = require('../db/db-service').connectDb();
/**
 * @param {Object} message
 */
function addMessage(message) {
  // Add numbers
  return Promise.all(
    [message.to, message.from].map(number => {
      return knex.raw(
        'INSERT INTO number (number, "dateCreated") VALUES (?, now()) ON CONFLICT DO NOTHING',
        number
      );
    })
  )
  // Add message
  .then(() => {
    return knex('message').insert({
      body: message.body,
      sid: message.sid,
      dateCreated: message.dateCreated,
      direction: message.direction,
      from: message.from,
      to: message.to
    });
  });
}

module.exports = {
  addMessage
}
