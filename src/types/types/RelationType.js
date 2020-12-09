import { typeLoader } from '../TypeLoader'
import { DefaultValidator } from '../validators/DefaultValidator'
import { DefaultRelation } from '../relations/DefaultRelation'
import { BaseRelation } from '../relations/BaseRelation'

export class RelationType extends BaseRelation {
  constructor (config) {
    super()

    this.name = config.name
    this.title = config.title
    this.relation_type = config.relation_type
    this.related_type = config.related_type
    this.validator = config.validator
  }

  createRelation () {
    const relation = new DefaultRelation()

    relation.name = this.name
    relation.title = this.title
    relation.relation_type = this.relation_type
    relation.related_type = this.related_type

    if (this.validator) {
      const validatorType = typeLoader.getValidatorType(this.validator.validator_type)
      const validator = validatorType.createValidator(this.title, this.validator)
      relation.validator = validator
    } else {
      relation.validator = new DefaultValidator()
    }

    return relation
  }
}
