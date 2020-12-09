import { Model } from '../Model'
import { typeLoader } from '../TypeLoader'
import { AttributeType } from './AttributeType'
import { RelationType } from './RelationType'

export default class ModelType {
  type = null
  title = null
  attributeTypes = {}
  relationTypes = {}

  constructor (config) {
    this.type = config.type
    this.title = config.title

    this.attributeTypes = config.attributes.map(a => new AttributeType(a))
    this.relationTypes = config.relations.map(r => new RelationType(r))
  }

  createModel (data = {}) {
    const model = new Model()

    model.$attributes = this.attributeTypes.reduce(function (map, attributeType) {
      map[attributeType.name] = attributeType.createAttribute()
      return map
    }, {})

    model.$relations = this.relationTypes.reduce(function (map, relationType) {
      map[relationType.name] = relationType.createRelation()
      return map
    }, {})

    model.id = data.id || null
    model.type = this.type

    this.attributeTypes.forEach(a => {
      const attribute = model.$attributes[a.name]
      const value = attribute.init(data[a.name])
      model[a.name] = value
    })

    this.relationTypes.forEach(r => {
      const modelType = typeLoader.getModelType(r.related_type)
      const related = modelType.createModel(data[r.name])
      model[r.name] = related
    })

    return model
  }

  get queryAttributes () {
    const fields = this.attributeTypes.map(a => a.name)

    const relations = this.relationTypes
    relations.forEach(r => {
      const relatedType = typeLoader.getModelType(r.related_type)
      fields.push({
        [r.name]: relatedType.queryAttributes
      })
    })

    return fields
  }
}
