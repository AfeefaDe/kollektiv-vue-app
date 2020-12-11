export class BaseFilter {
  name = null
  title = null
  filter_type = null
  value = null

  clone () {
    const filter = new this.constructor()
    for (const key of Object.keys(this)) {
      filter[key] = this[key]
    }
    return filter
  }

  toUrlParams () {
    return {
      [this.name]: this.value ? this.value.toString() : undefined
    }
  }

  toApiFilter () {
    return {
      [this.name]: this.value || undefined
    }
  }

  initFromUrl (queryString) {
    if (queryString[this.name]) {
      this.value = queryString[this.name]
    }
  }

  initFromUsed (usedFilters, filterOptions) {
    if (usedFilters[this.name]) {
      this.value = usedFilters[this.name]
    }
  }
}
