const faker = require('faker');
const addMessage = require('../src/message/add-message').addMessage;
const addPerson = require('../src/person/add-person').addPerson;

exports.seed = function(knex, Promise) {
  const data = generateData(20, 100);
  // Delete previous values
  return knex('numberToPerson').del()
    .then(() => knex('person').del())
    .then(() => knex('message').del())
    .then(() => knex('number').del())
    // Add messages
    .then(() => Promise.all(data.messages.map(message => addMessage(message))))
    .then(() => Promise.all(data.people.map(person => addPerson(person.data, person.number))));
};

/**
 * Generates message data
 * @param {number} numbers amount of numbers per person
 * @param {number} messages minimum amount of messages per number
 */
function generateData(maxNumbers, averageMessages) {
  const myNumber = generatePhone();
  const messages = generateMessages(maxNumbers, averageMessages, myNumber);
  const people = genereatePeople(messages.numbers, myNumber);
  return {
    messages: messages.data,
    numbers: messages.numbers,
    people: people
  };
}

function generatePhone() {
  return ('+1' + faker.phone.phoneNumberFormat()).split('-').join('');
}

function generateMessages(maxNumbers, averageMessages, myNumber) {
  const data = [];
  const numbers = [];
  // Create phone numbers
  for (let i = 0; i < maxNumbers; i++) {
    const fromNumber = generatePhone();
    numbers.push(fromNumber);
    const maxMessages = randomIntFromInterval(1, averageMessages * 2);
    // Create messages
    for (let n = 0; n < maxMessages; n++) {
      const inbound = Boolean(faker.random.boolean());
      data.push({
        body: faker.lorem.sentence(),
        sid: faker.random.uuid(),
        dateCreated: new Date(),
        direction: inbound ? 'inbound' : 'outbound',
        from: inbound ? fromNumber : myNumber,
        to: inbound ? myNumber : fromNumber,
      });
    }
  }
  return {
    data,
    numbers
  };
}

function genereatePeople(numbers, myNumber) {
   // Add people
  const people = numbers.map(number => {
    return {
      data: {
        firstName: faker.random.boolean() ? faker.name.firstName() : null,
        lastName: faker.random.boolean() ? faker.name.lastName() : null,
        job: faker.random.boolean() ? faker.name.jobTitle() : null,
        dateCreated: new Date() // new Date(faker.date.recent()) didn't work.. ??
      },
      number: number
    };
  });
  // Add self
  people.push({
    data: {
      firstName: 'Adrian',
      lastName: 'Carriger',
      job: 'Software Developer',
      dateCreated: new Date()
    },
    number: myNumber
  });
  return people;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
