import BaseRepository from './base'

class CategoryRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/categories'
  }

  async getAttributesByCateID (query = {}, headers = {}) {
    let url = this.apiVersion() + '/attributes'
    try {
      let response = await this.httpClient.get(url, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}

export default CategoryRepository

