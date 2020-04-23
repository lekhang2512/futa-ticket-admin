import BaseRepository from './base'

class WardRepository extends BaseRepository {
  url () {
    return this.apiVersion() +  '/wards'
  }
}

export default WardRepository

