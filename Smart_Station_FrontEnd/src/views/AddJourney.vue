<script>
export default {
  data() {
    return {
      journeyData: {
        id: 1,
        startLocation: '',
        destination: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        // Axios: POST the form data to the /journeys endpoint.
        // The base URL is supplied by the shared Axios client.
        const response = await this.$apiClient.post('/journeys', this.journeyData)
        console.log('Response:', response)
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
        <label for="startLocation">Start Location:</label>
        <input
          id="startLocation"
          v-model="journeyData.startLocation"
          type="text"
          required
        />
        <label for="destination">Destination:</label>
        <input
          id="destination"
          v-model="journeyData.destination"
          type="text"
          required
        />
      </div>
      <button type="submit">Add Journey</button>
    </form>
  </div>
</template>
