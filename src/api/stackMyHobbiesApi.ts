import axios from 'axios'

const stackMyHobbiesApi = axios.create({
  baseURL: import.meta.env.VITE_STACKMYHOBBIES_BASE_URL,
})

stackMyHobbiesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export { stackMyHobbiesApi }
