import BaseRepository from './base'

class TicketTypeRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/ticket-types'
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

export default TicketTypeRepository

