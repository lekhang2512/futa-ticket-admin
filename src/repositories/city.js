import BaseRepository from './base'

class CityRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/cities'
  }
}

export default CityRepository

