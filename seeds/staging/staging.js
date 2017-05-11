const addMessage = require('../../src/message/add-message').addMessage;
const addPerson = require('../../src/person/add-person').addPerson;
const myNumber = require('../../config/my-config').phone;
const getMessages = require('../../src/twilio/get-messages').getMessages;

exports.seed = function(knex, Promise) {
  // Delete previous values
  return knex('numberToPerson').del()
    .then(() => knex('person').del())
    .then(() => knex('message').del())
    .then(() => knex('number').del())
    // Get Messages
    .then(getMessages)
    // Add messages
    .then(messages => {
      console.log('messages are here', messages[0]);
      return Promise.all(messages.map(message => addMessage(message)));
    })
    // Add self
    .then(() => {
      addPerson({
        firstName: 'Adrian',
        lastName: 'Carriger',
        job: 'Software Developer',
        datecreated: new Date()
      }, myNumber);
    });
};