import BaseRepository from './base'

class TicketRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/sources'
  }
}

export default TicketRepository

