import BaseRepository from './base'

class BankRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/banks'
  }
}

export default BankRepository

