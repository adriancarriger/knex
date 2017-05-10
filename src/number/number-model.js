'use strict';

const { Model } = require('objection');

/**
 * @class NumberModel
 * @extends DbModel
 */
class NumberModel extends Model {
	static get tableName() {
		return 'number';
	}
}

module.exports = {
	NumberModel,
};
