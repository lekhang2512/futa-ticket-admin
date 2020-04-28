import BaseRepository from './base'

class TicketRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/tickets'
  }

  async create (data, query = {}, headers = {}) {
    let url = this.apiVersion() + '/tickets'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}

export default TicketRepository

