<script>
export default {
  data() {
    return {
      journeyData: {
        // Dummy value: replace with backend-generated id when API owns identity.
        id: 1,
        startLocation: '',
        destination: '',
        weekDay: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
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
        <label for="weekDay">Week Day:</label>
        <select
          id="weekDay"
          v-model="journeyData.weekDay"
          required
        >
          <option value="" disabled>Select a day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>
      <button type="submit">Add Journey</button>
    </form>
  </div>
</template>
