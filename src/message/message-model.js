'use strict';

const { Model } = require('objection');

/**
 * @class MessageModel
 * @extends Model
 */
class MessageModel extends Model {
  static get tableName() {
    return 'message';
  }

}

module.exports = {
  MessageModel
};
