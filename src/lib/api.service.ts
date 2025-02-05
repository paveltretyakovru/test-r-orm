/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

const host = "https://test2.sionic.ru"

class ApiService {
  get<T>(route: string, clearResponse?: boolean): Promise<T> {
    return fetch(`${host}${route}`)
      .then(response => {
        return (clearResponse && response) || response.json()
      })
      .then(data => data as T)
      .catch(err => err)
  }
}

const api = new ApiService()

export default api
