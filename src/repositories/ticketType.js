import BaseRepository from './base'

class TicketTypeRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/ticket-types'
  }
}

export default TicketTypeRepository

