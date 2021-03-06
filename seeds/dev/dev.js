const faker = require('faker');
const hipsum = require('lorem-hipsum');
const addMessage = require('../../src/message/add-message').addMessage;
const addPersonToNumber = require('../../src/person/add-person').addPersonToNumber;
const  { addSelf, generatePhone, myNumber } = require('../shared/shared');

exports.seed = function(knex, Promise) {
  const data = generateData(10, 4);
  // Delete previous values
  return knex('numberToPerson').del()
    .then(() => knex('self').del())
    .then(() => knex('person').del())
    .then(() => knex('message').del())
    .then(() => knex('number').del())
    // Add messages
    .then(() => Promise.all(data.messages.map(message => addMessage(message))))
    .then(() => Promise.all(data.people.map(person => addPersonToNumber(person.data, person.number))))
    // Add self
    .then(() => addSelf(knex));
};

/**
 * Generates message data
 * @param {number} numbers amount of numbers per person
 * @param {number} messages minimum amount of messages per number
 */
function generateData(maxNumbers, averageMessages) {
  const messages = generateMessages(maxNumbers, averageMessages, myNumber);
  const people = genereatePeople(messages.numbers, myNumber);
  return {
    messages: messages.data,
    numbers: messages.numbers,
    people: people
  };
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
        body: inbound ? hipsum() : faker.hacker.phrase(),
        sid: faker.random.uuid(),
        dateSent: new Date(faker.date.recent()), // dateSent is camelCased to match Twilio's api
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
  return numbers.map(number => {
    return {
      data: {
        firstName: faker.random.boolean() ? faker.name.firstName() : null,
        lastName: faker.random.boolean() ? faker.name.lastName() : null,
        job: faker.random.boolean() ? faker.name.jobTitle() : null,
        datecreated: new Date(faker.date.recent())
      },
      number: number
    };
  });
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
