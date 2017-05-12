'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { connectDb } = require('./db/db-service');
const { messageRoute } = require('./message/message-route');

function createServer() {
  const app = express();

  connectDb();

  return app
    .use(bodyParser.json())
    .use(messageRoute())
    .set('json spaces', 2);
}

module.exports = {
  createServer
}
