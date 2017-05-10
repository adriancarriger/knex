const knex = require('./db/db-service').connectDb();
/**
 * @param {Object} person
 * @param {string} phone
 */
function addPerson(person, phone) {
  // Add
  return knex('people').insert(person).returning('id')
    .then(([personId]) => {
      return knex('numbersToPeople').insert({
        number: phone,
        personId: personId,
        dateCreated: new Date()
      });
    });
}

module.exports = {
  addPerson
}