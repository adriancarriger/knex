'use strict';

const { Model } = require('objection');

class PersonModel extends Model {

  static get tableName() {
    return 'person';
  }
}

module.exports = {
  PersonModel
};
