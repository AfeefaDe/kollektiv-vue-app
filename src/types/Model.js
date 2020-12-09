export class Model {
  $attributes = {}
  $relations = {}

  constructor () {
    Object.defineProperty(this, '$attributes', {
      enumerable: false
    })
    Object.defineProperty(this, '$relations', {
      enumerable: false
    })
  }
}
