import BaseRepository from './base'

class UserRepository extends BaseRepository {

  url () {
    return this.apiVersion() + '/users'
  }

  async login (credential, query = {}, headers = {}) {
    let url = '/login'
    try {
      let response = await this.httpClient.post(url, credential, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async logout () {
    let url = this.apiVersion() + '/me/logout'
    try {
      let response = await this.httpClient.get(url)
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async profile(query = {}, headers = {}) {
    let url = '/me'
    try {
      let response = await this.httpClient.get(url, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async changeProfile(data, query = {}, headers = {}) {
    let url = this.apiVersion() + '/me/update-profile'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async forgotPassword (credential, query = {}, headers = {}) {
    let url = '/forgot-password'
    try {
      let response = await this.httpClient.post(url, credential, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async changePassword(data, query = {}, headers = {}) {
    let url = this.apiVersion() + '/me/change-password'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async register (data, query = {}, headers = {}) {
    let url = '/register'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }

  async changeAvatar(data, query = {}, headers = {}) {
    let url = this.apiVersion() + '/me/change-avatar'
    try {
      let response = await this.httpClient.post(url, data, { params: query, headers: headers })
      return this.success(response.data)
    } catch(e) {
      return this.handlerHttpError(e)
    }
  }
}


export default UserRepository

