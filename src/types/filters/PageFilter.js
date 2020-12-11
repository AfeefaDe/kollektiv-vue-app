import { BaseFilter } from './BaseFilter'

export class PageFilter extends BaseFilter {
  value = {
    page: 1,
    page_size: 10
  }

  toUrlParams () {
    return {
      page: this.value.page > 1 ? this.value.page.toString() : undefined
      // page_size: this.value.page_size.toString()
    }
  }

  toApiFilter () {
    return this.value
  }

  initFromUrl (queryString) {
    if (queryString.page) {
      this.value.page = parseInt(queryString.page)
    }

    // if (queryString.page_size) {
    //   this.value.page = parseInt(queryString.page_size)
    // }
  }

  initFromUsed (usedFilters) {
    if (usedFilters.page) {
      this.value.page = usedFilters.page.page
      this.value.page_size = usedFilters.page.page_size
    }
  }

  reset () {
    this.value = {
      page: 1,
      page_size: 10
    }
  }
}
