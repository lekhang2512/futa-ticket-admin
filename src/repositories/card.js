import BaseRepository from './base'

class CardRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/me/bank-cards'
  }

  async create (data, query = {}, headers = {}) {
    let url = this.apiVersion() + '/cards'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}

export default CardRepository

