import { HasOneValidator } from '../validators/HasOneValidator'
import { VarcharValidator } from '../validators/VarcharValidator'

export default class ValidatorType {
  validator_type = null
  rules = []

  constructor (config) {
    this.validator_type = config.validator_type
    this.rules = config.rules
  }

  createValidator (fieldName, data) {
    let validator

    switch (this.validator_type) {
      case 'Kollektiv\\Varchar':
        validator = new VarcharValidator()
        break
      case 'Kollektiv\\HasOne':
        validator = new HasOneValidator()
        break
    }

    if (!validator) {
      console.error('There is no validator of class', this.validator_type)
    }

    validator.fieldName = fieldName

    Object.keys(this.rules).forEach(rule => {
      validator.rules[rule] = {
        ...this.rules[rule]
      }
    })

    Object.keys(validator.rules).forEach(rule => {
      if (data.rules[rule] !== undefined) {
        validator.rules[rule].param = data.rules[rule]
      }
    })

    return validator
  }
}
