<script>
export default {
  data() {
    return {
      submissionError: '',
      journeyData: {
        // Dummy value: replace with backend-generated id when API owns identity.
        id: 1,
        startLocation: '',
        destination: '',
        weekDay: '',
      },
    }
  },
  mounted() {
    const selectedDate = this.$route.query.date

    if (typeof selectedDate === 'string') {
      const [year, month, day] = selectedDate.split('-').map(Number)
      const dateObject = new Date(year, month - 1, day)

      if (!Number.isNaN(dateObject.getTime())) {
        // The selected calendar date determines the weekday sent to the existing backend payload.
        this.journeyData.weekDay = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
        }).format(dateObject)
      }
    }
  },
  methods: {
    async submitForm() {
      this.submissionError = ''

      try {
        const response = await this.$apiClient.post('/journeys', this.journeyData)
        console.log('Response:', response)
        this.$router.push({ name: 'calendar-overview' })
      } catch (error) {
        console.error('Error submitting form:', error)
        this.submissionError = 'The journey could not be added. Please try again.'
      }
    },
    returnToCalendar() {
      this.$router.push({ name: 'calendar-overview' })
    },
  },
}
</script>

<template>
  <!-- Styling-only change: wraps the existing fields and submit button with classes used by src/styles/add-journey.css. -->
  <div class="add-journey">
    <form @submit.prevent="submitForm">
      <div class="form-fields">
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
        <!-- The weekday is now derived from the date selected in the calendar, not entered manually. -->
      </div>
      <!-- The form verification action is labeled Accept and returns to the calendar after a successful POST. -->
      <button type="submit" class="submit-button">Accept</button>

      <div v-if="submissionError" class="submission-error" role="alert">
        <p>{{ submissionError }}</p>
        <div class="submission-actions">
          <button type="button" class="try-again-button" @click="submitForm">
            Try Again
          </button>
          <button type="button" class="back-button" @click="returnToCalendar">
            Back to Calendar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped src="../styles/add-journey.css"></style>
