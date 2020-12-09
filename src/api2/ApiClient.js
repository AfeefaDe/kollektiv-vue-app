import axios from 'axios'

import { AlertEvent } from '../events/AlertEvent'
import { eventBus } from '../events/EventBus'
import { SaveEvent } from '../events/SaveEvent'
import { typeLoader } from '../types/TypeLoader'
import { timeout } from '../utils/timeout'
import { ApiError } from './ApiError'

class ApiClient {
  endpoint = null

  async list (type, fields, keyword = '', page = 1, page_size = 5) {
    const query = {
      type: type,
      fields,
      filters: {
        query: keyword,
        page,
        page_size
      }
    }

    try {
      const result = await this.lastMinMilliSeconds(300, () => {
        return axios.post(this.endpoint + '/list', {
          query: query
        })
      })
      return result.data
    } catch (e) {
      console.log(e)
      eventBus.$emit(AlertEvent.ERROR, new ApiError(e).message)
      return null
    }
  }

  async loadTypes () {
    try {
      const result = await axios.get('/api2/types')
      return result.data
    } catch (e) {
      eventBus.$emit(AlertEvent.ERROR, new ApiError(e).message)
      return null
    }
  }

  async get (type, id, fields) {
    const query = {
      type,
      id,
      fields
    }

    try {
      const result = await this.lastMinMilliSeconds(300, () => {
        return axios.post(this.endpoint + '/get', {
          query
        })
      })

      const data = result.data.data
      const model = this.createModel(data)
      return model
    } catch (e) {
      eventBus.$emit(AlertEvent.ERROR, new ApiError(e).message)
      return null
    }
  }

  async save (type, id, updates, fields) {
    const query = {
      type,
      id,
      updates,
      fields
    }

    try {
      eventBus.$emit(SaveEvent.START_SAVING)

      const result = await this.lastMinMilliSeconds(800, () => {
        return axios.post(this.endpoint + '/save', {
          query: query
        })
      })

      eventBus.$emit(SaveEvent.STOP_SAVING)

      const data = result.data.data
      const model = this.createModel(data)
      return model
    } catch (e) {
      eventBus.$emit(AlertEvent.ERROR, new ApiError(e).message)
      eventBus.$emit(SaveEvent.STOP_SAVING)
      return null
    }
  }

  createModel (data) {
    const modelType = typeLoader.getModelType(data.type)
    return modelType.createModel(data)
  }

  async lastMinMilliSeconds (milliseconds, callback) {
    const t1 = new Date().getTime()

    const result = await callback()

    const duration = new Date().getTime() - t1
    const timeLeft = Math.max(0, milliseconds - duration)

    // console.log(milliseconds, duration, timeLeft)

    return timeout(() => {
      return result
    }, timeLeft)
  }
}

export const apiClient = new ApiClient()
