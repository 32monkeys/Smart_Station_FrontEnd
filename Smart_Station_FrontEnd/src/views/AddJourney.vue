<script>
export default {
  data() {
    return {
      journeyData: {
        id: 1,
        endStation: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        // Axios: POST the form data to the /journeys endpoint.
        // The base URL is supplied by the shared Axios client.
        const response = await this.$apiClient.post('/journeys', this.journeyData)
        console.log('Journey added:', response.data)
      } catch (error) {
        // Axios/network or API response error.
        console.error('Error submitting form:', error)
      }
    },
  },
}
</script>

<template>
  <div class="add-journey">
    <form @submit.prevent="submitForm">
      <div>
        <label for="endStation">End Station:</label>
        <input
          id="endStation"
          v-model="journeyData.endStation"
          type="text"
          required
        />
      </div>
      <button type="submit">Add Journey</button>
    </form>
  </div>
</template>
