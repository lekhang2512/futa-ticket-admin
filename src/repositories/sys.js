import BaseRepository from './base'

class SysRepository extends BaseRepository {
  async permissions (params) {
    let url = '/sys/permissions'
    try {
      let response = await this.httpClient.get(url, params)
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async groups (params) {
    let url = '/sys/groups'
    try {
      let response = await this.httpClient.get(url, params)
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}


export default SysRepository

