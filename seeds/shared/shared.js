const faker = require('faker');
const addPersonToNumber = require('../../src/person/add-person').addPersonToNumber;
const myNumber = require('../../config/my-config').phone

function addSelf(knex) {
  return addPersonToNumber({
    firstName: 'Adrian',
    lastName: 'Carriger',
    job: 'Software Developer',
    datecreated: new Date()
  }, myNumber)
  .then(([id]) => knex('self').insert({ type: 'phone', value: id }));
}

function generatePhone() {
  return ('+1' + faker.phone.phoneNumberFormat()).split('-').join('');
}

module.exports = {
  addSelf,
  generatePhone,
  myNumber
};
