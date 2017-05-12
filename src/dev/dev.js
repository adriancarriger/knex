'use strict';

const { connectDb } = require('../db/db-service');
const screen = require('../util/screen');

/**
 * @method run
 * @param {string} mode
 */
function run(knexQuery, mode) {
  const knex = connectDb();
  // App setup
  screen.clear();
  knexQuery
    .then(data => screen.write(data, mode))
    .catch(error => console.warn(error))
    .finally(() => {;
      connectDb().destroy();
      console.log('Done.');
    });
}

module.exports = {
  run
}