const knex = require('../db/db-service').connectDb();
/**
 * @param {Object} person
 * @param {string} phone
 */
function addPersonToNumber(person, phone) {
  // Add
  return knex('person').insert(person).returning('id')
    .then(([personId]) => {
      return knex('numberToPerson').insert({
        number: phone,
        personId: personId,
        datecreated: new Date()
      }).returning('id');
    });
}

module.exports = {
  addPersonToNumber
};
