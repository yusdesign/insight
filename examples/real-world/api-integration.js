// Real-world API integration pattern
class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || 5000;
    this.retries = options.retries || 3;
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'GET',
      headers: this.headers,
      timeout: this.timeout,
      ...options
    };

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        if (attempt === this.retries) {
          throw new Error(`API request failed after ${this.retries} attempts: ${error.message}`);
        }
        
        // Exponential backoff
        await this.sleep(1000 * attempt);
      }
    }
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example
const api = new APIClient('https://api.example.com', {
  headers: {
    'Authorization': 'Bearer token123'
  },
  retries: 5
});