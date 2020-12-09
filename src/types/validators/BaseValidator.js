export class BaseValidator {
  fieldName = null
  rules = {}

  getRules () {
    return []
  }

  getRuleParam (ruleName) {
    return this.rules[ruleName] && this.rules[ruleName].param
  }

  getValidationMessage (rule, params = {}) {
    params.fieldName = this.fieldName
    params.param = rule.param

    return rule.message.replace(/{{\s*(\w+)\s*}}/g, function (m, m1) {
      return params[m1] || m
    })
  }
}
