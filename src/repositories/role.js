import BaseRepository from './base'

class RoleRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/roles'
  }
}

export default RoleRepository

