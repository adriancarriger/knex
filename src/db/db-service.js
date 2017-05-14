'use strict';

// 3rd part imports
const knexFunction = require('knex');
const { Model } = require('objection');
// Local imports
const knexConfig = require('../../config/knexfile.js');

let knex;

/**
 * @method connectDb
 * @return (Knex)
 */
function connectDb() {
  if (knex) {
    return knex;
  }

  knex = knexFunction(knexConfig.development);
  Model.knex(knex);

  return knex;
}

module.exports = {
  connectDb,
};
