import BaseRepository from './base'

class CountryRepository extends BaseRepository {
  url () {
    return '/location/api/v1/countries'
  }
}

export default CountryRepository

