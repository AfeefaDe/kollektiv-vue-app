import { BaseValidator } from './BaseValidator'

export class HasOneValidator extends BaseValidator {
  getRules () {
    const rules = [
      this.empty
    ]
    return rules
  }

  empty = value => {
    if (this.getRuleParam('empty') === false) {
      if (!value) {
        return this.getValidationMessage(this.rules.empty)
      }
    }
    return true
  }
}
