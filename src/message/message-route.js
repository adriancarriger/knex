'use strict';

const { Router } = require('express');
const { MessageModel } = require('./message-model');

function getMessages(request, response, next) {
  MessageModel
    .query()
    .select(
      'message.sid',
      'body',
      'direction',
      'message.datecreated',
      'from:people.firstName as from',
      'from.number as fromNumber',
      'to:people.firstName as to'
    )
    .leftOuterJoinRelation('[from.people, to.people]')
    .orderBy('message.datecreated')
    .then(messages => {
      return response.json(messages);
    });
}

function messageRoute() {
  return Router()
    .get('/', getMessages);
}

module.exports = {
  messageRoute
};
