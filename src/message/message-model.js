'use strict';

const { Model } = require('objection');

/**
 * @class MessageModel
 * @extends DbModel
 */
class MessageModel extends Model {
	static get tableName() {
		return 'message';
	}
}

module.exports = {
	MessageModel,
};
