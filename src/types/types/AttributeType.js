import { BaseAttribute } from '../attributes/BaseAttribute'
import { typeLoader } from '../TypeLoader'
import { DefaultValidator } from '../validators/DefaultValidator'
import { VarcharAttribute } from '../attributes/VarcharAttribute'
import { DefaultAttribute } from '../attributes/DefaultAttribute'

export class AttributeType extends BaseAttribute {
  constructor (config) {
    super()

    this.name = config.name
    this.title = config.title
    this.attribute_type = config.attribute_type
    this.validator = config.validator
  }

  createAttribute () {
    let attribute

    switch (this.attribute_type) {
      case 'Kollektiv\\Varchar':
        attribute = new VarcharAttribute()
        break
      default:
        attribute = new DefaultAttribute()
    }

    attribute.name = this.name
    attribute.title = this.title
    attribute.attribute_type = this.attribute_type

    if (this.validator) {
      const validatorType = typeLoader.getValidatorType(this.validator.validator_type)
      const validator = validatorType.createValidator(this.title, this.validator)
      attribute.validator = validator
    } else {
      attribute.validator = new DefaultValidator()
    }

    return attribute
  }
}
