// Import Axios so we can create one shared API client.
import axios from 'axios'

// Axios: configure the base URL and request timeout once for all API calls.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7209/api',
  timeout: 10000,
})

// Export the configured Axios client for use by Vue components.
export default apiClient