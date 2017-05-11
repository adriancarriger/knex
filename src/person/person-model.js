'use strict';

const { Model } = require('objection');
const { NumberModel } = require('../number/number-model');

class PersonModel extends Model {

  static get tableName() {
    return 'person';
  }

  static get relationMappings() {
    return {
      numbers: {
        relation: Model.ManyToManyRelation,
        modelClass: NumberModel,
        join: {
          from: 'person.id',
          through: {
            from: 'numberToPerson.personId',
            to: 'numberToPerson.number'
          },
          to: 'number.number'
        }
      }
    };
  }
}

module.exports = {
  PersonModel
};
