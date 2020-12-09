import { apiClient } from '../api2/ApiClient'
import ModelType from './types/ModelType'
import ValidatorType from './types/ValidatorType'

class TypeLoader {
  types = {}
  validators = {}

  async load () {
    const types = await apiClient.loadTypes('/api2/types')

    types.model_types.forEach(m => {
      this.types[m.type] = new ModelType(m)
    })

    types.validator_types.forEach(v => {
      this.validators[v.validator_type] = new ValidatorType(v)
    })
  }

  getModelType (type) {
    return this.types[type]
  }

  getValidatorType (validatorType) {
    return this.validators[validatorType]
  }
}

export const typeLoader = new TypeLoader()
