const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const table = 'messages';
  return knex(table).del()
    .then(function () {
      // Inserts seed entries
      return knex(table).insert( phoneData(10) );
    });
};

function phoneData(rows) {
  let data = [];
  for (let i = 0; i < rows; i++) {
    data.push({
      body: faker.lorem.text(),
      sid: faker.random.uuid(),
      dateCreated: faker.date.recent(),
      direction: faker.random.boolean() ? 'inbound' : 'outbound',
      from: ('+1' + faker.phone.phoneNumberFormat()).split('-').join(''),
      to: ('+1' + faker.phone.phoneNumberFormat()).split('-').join('')
    });
  }
  return data;
}
