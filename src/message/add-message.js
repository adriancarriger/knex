const knex = require('../db/db-service').connectDb();
/**
 * @param {Object} message
 */
function addMessage(message) {
  // Add numbers
  return Promise.all(
    [message.to, message.from].map(number => {
      return knex.raw(
        'INSERT INTO numbers (number, "dateCreated") VALUES (?, now()) ON CONFLICT DO NOTHING',
        number
      );
    })
  )
  // Add message
  .then(() => {
    return knex('messages').insert({
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
