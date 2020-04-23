import BaseRepository from './base'

class DistrictRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/districts'
  }
}

export default DistrictRepository

