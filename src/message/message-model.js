'use strict';

const { Model } = require('objection');
const { NumberModel } = require('../number/number-model');

/**
 * @class MessageModel
 * @extends Model
 */
class MessageModel extends Model {
  static get tableName() {
    return 'message';
  }

  static get relationMappings() {
    return {
      from: {
        relation: Model.BelongsToOneRelation,
        modelClass: NumberModel,
        join: {
          from: 'message.from',
          to: 'number.number'
        }
      },
      to: {
        relation: Model.BelongsToOneRelation,
        modelClass: NumberModel,
        join: {
          from: 'message.to',
          to: 'number.number'
        }
      }
    };
  }

}

module.exports = {
  MessageModel
};
