const addMessage = require('../../src/message/add-message').addMessage;
const addPersonToNumber = require('../../src/person/add-person').addPersonToNumber;
const { addSelf } = require('../shared/shared');
const getMessages = require('../../src/twilio/get-messages').getMessages;

exports.seed = function(knex, Promise) {
  // Delete previous values
  return knex('numberToPerson').del()
    .then(() => knex('self').del()) 
    .then(() => knex('person').del())
    .then(() => knex('message').del())
    .then(() => knex('number').del())
    // Get Messages
    .then(getMessages)
    // Add messages
    .then(messages => {
      return Promise.all(messages.map(message => addMessage(message)));
    })
    // Add self
    .then(() => addSelf(knex));
};