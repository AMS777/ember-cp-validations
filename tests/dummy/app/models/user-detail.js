/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import DS from 'ember-data';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

var attr = DS.attr;

var Validations = buildValidations({
  firstName: validator('presence', true),

  lastName: [
    validator('presence', true),
    validator('dependent', {
      on: ['firstName']
    })
  ],

  dob: [
    validator('presence', true),
    validator('date', {
      before: 'now',
      after: '1/1/1900',
      format: 'M/D/YYYY',
      attributeDescription: 'Date of birth',
      message: function(type, options, value) {
        if (type === 'before') {
          return 'should really be before %@';
        }
        if (type === 'after') {
          return 'should really be after %@';
        }
      }
    })
  ],

  phone: [
    validator('format', {
      type: 'phone',
      allowBlank: true
    })
  ],

  url: [
    validator('format', {
      type: 'url',
      allowBlank: true
    })
  ]

});

export default DS.Model.extend(Validations, {
  "firstName": attr('string'),
  "lastName": attr('string'),
  "dob": attr('date'),
  "phone": attr('string'),
  "url": attr('string')
});
