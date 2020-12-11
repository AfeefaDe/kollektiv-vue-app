import { apiClient } from '../api2/ApiClient'
import FilterType from './types/FilterType'
import ModelType from './types/ModelType'
import ValidatorType from './types/ValidatorType'

class TypeLoader {
  model_types = {}
  validator_types = {}
  filter_types = {}

  async load () {
    const types = await apiClient.loadTypes()

    types.filter_types.forEach(f => { // create filters and validators before model
      this.filter_types[f.filter_type] = new FilterType(f)
    })

    types.validator_types.forEach(v => {
      this.validator_types[v.validator_type] = new ValidatorType(v)
    })

    types.model_types.forEach(m => {
      this.model_types[m.type] = new ModelType(m)
    })
  }

  getModelType (type) {
    return this.model_types[type]
  }

  getValidatorType (validatorType) {
    return this.validator_types[validatorType]
  }

  getFilterType (filterType) {
    return this.filter_types[filterType]
  }
}

export const typeLoader = new TypeLoader()
