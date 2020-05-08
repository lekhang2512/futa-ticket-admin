import BaseRepository from './base'

class PermissionRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/permissions'
  }
}

export default PermissionRepository

