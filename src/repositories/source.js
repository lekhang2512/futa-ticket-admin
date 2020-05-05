import BaseRepository from './base'

class TicketRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/sources'
  }

  async update (id, data, query = {}, headers = {}) {
    try {
      let response = await this.httpClient.put(this.url() + '/' + id, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch (e) {
      return this.handlerHttpError(e)
    }
  }
}

export default TicketRepository

