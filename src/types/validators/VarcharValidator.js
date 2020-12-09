import { BaseValidator } from './BaseValidator'

export class VarcharValidator extends BaseValidator {
  getRules () {
    const rules = [
      this.required,

      this.min,

      this.max,

      this.regex
    ]
    return rules
  }

  required = value => {
    if (this.rules.require_on) {
      if (!value) {
        return this.getValidationMessage(this.rules.required)
      }
    }
    return true
  }

  min = value => {
    if (!this.rules.require_on && !value) {
      return true
    }

    if (this.rules.min && this.rules.min.param) {
      if (value.length < this.rules.min.param) {
        return this.getValidationMessage(this.rules.min)
      }
    }
    return true
  }

  max = value => {
    if (this.rules.max && this.rules.max.param) {
      if (value.length > this.rules.max.param) {
        return this.getValidationMessage(this.rules.max)
      }
    }
    return true
  }

  regex = value => {
    if (!this.rules.require_on && !value) {
      return true
    }

    if (this.rules.regex && this.rules.regex.param) {
      if (!(new RegExp(this.rules.regex.param).test(value))) {
        // console.log('invalid', this.rules.regex.param, value)
        return this.getValidationMessage(this.rules.regex)
      }
    }
    return true
  }
}
