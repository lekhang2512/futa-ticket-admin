import BaseRepository from './base'

class TicketRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/tickets'
  }

  async getHelpers (query = {}, headers = {}) {
    let url = this.url() + '/helpers'
    try {
      let response = await this.httpClient.get(url, { params: query, headers: headers })
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
  async close (id, query = {}, headers = {}) {
    try {
      let response = await this.httpClient.put(`${this.url()}/${id}/closed`, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}

export default TicketRepository

