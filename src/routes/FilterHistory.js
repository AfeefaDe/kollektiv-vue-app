class FilterHistory {
  filters = {}

  getFilters (path, filters) {
    if (!this.filters[path]) {
      this.filters[path] = filters.map(f => f.clone())
    }
    return this.filters[path]
  }
}

export const filterHistory = new FilterHistory()
