import BaseRepository from './base'

class ConfigRepository extends BaseRepository {
  url () {
    return this.apiVersion() + '/configs'
  }
}

export default ConfigRepository

