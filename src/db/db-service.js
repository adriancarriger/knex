'use strict';

// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('../../knexfile.js');

let knex;

/**
 * @method connectDb
 * @return (Knex)
 */
function connectDb() {
	if (knex) {
		return knex;
	}

  console.log('connecting...');

	knex = knexFunction(knexConfig.development);

	return knex;
}

module.exports = {
	connectDb,
};
