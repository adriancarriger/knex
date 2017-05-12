'use strict';

const { Model } = require('objection');
const { PersonModel } = require('../person/person-model');

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
      people: {
        relation: Model.ManyToManyRelation,
        modelClass: PersonModel,
        join: {
          from: 'number.number',
          through: {
            from: 'numberToPerson.number',
            to: 'numberToPerson.personId'
          },
          to: 'person.id'
        }
      }
    };
  }
}

module.exports = {
  NumberModel
};
