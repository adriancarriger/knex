'use strict';

const { Model } = require('objection');
const { MessageModel } = require('../message/message-model');

/**
 * @class NumberModel
 * @extends DbModel
 */
class NumberModel extends Model {
	static get tableName() {
		return 'number';
	}

	static get relationMappings() {
    return {
      outgoingMessages: {
        relation: Model.HasManyRelation,
        modelClass: MessageModel,
        join: {
          from: 'number.number',
          to: 'message.from'
        }
      },
			incomingMessages: {
        relation: Model.HasManyRelation,
        modelClass: MessageModel,
        join: {
          from: 'number.number',
          to: 'message.to'
        }
      }
    };
  }
}

module.exports = {
	NumberModel,
};
