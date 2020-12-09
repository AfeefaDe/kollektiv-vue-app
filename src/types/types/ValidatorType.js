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

    if (data.validator_type === 'Kollektiv\\Varchar') {
      validator = new VarcharValidator()
    } else if (data.validator_type === 'Kollektiv\\HasOne') {
      validator = new HasOneValidator()
    } else {
      console.error('There is no validator of class', data.validator_type)
    }

    validator.fieldName = fieldName

    Object.keys(this.rules).forEach(rule => {
      validator.rules[rule] = {
        ...this.rules[rule]
      }
    })

    Object.keys(validator.rules).forEach(rule => {
      if (data.rules[rule]) {
        validator.rules[rule].param = data.rules[rule]
      }
    })

    return validator
  }
}
