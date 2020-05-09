class BaseRepository {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  apiVersion () {
    return process.env.VUE_APP_API_VERSION
  }

  url () {
    // ex:
    // return '/me'
    throw new Error('You have to implement the method url!');
  }

  async getByQuery (query = {}, headers = {}) {
    try {
      let response = await this.httpClient.get(this.url(), { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async getDetail (id, query = {}, headers = {}) {
    try {
      query.include = query.include ? query.include : []
      // query.include.push('permissions')
      let response = await this.httpClient.get(this.url() + '/' + id, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async create (data, query = {}, headers = {}) {
    try {
      let response = await this.httpClient.post(this.url(), data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async update (id, data, query = {}, headers = {}) {
    try {
      let response = await this.httpClient.put(this.url() + '/' + id, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async delete (id, query = {}, headers = {}) {
    try {
      let response = await this.httpClient.delete(this.url() + '/' + id, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  handlerHttpError (e) {
    if (e.response && e.response.data) {
      let data = {...e.response.data}
      data.status = data.status || e.response.status
      data.code = data.code || e.response.status
      return this.error(data)
    } else {
      throw  e
    }
  }

  success (data) {
    return {'success': true, response: data}
  }

  error (error) {
    return {'success': false, response: error}
  }
}

export default BaseRepository
