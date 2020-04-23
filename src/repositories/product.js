import BaseRepository from './base'

class ProductRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/products'
  }

  async chooseToImport (data, query = {}, headers = {}) {
    let url = this.apiVersion() + '/products/choose-product'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}

export default ProductRepository

