<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      journeys: [],
    }
  },
  computed: {
    dateObject() {
      const [year, month, day] = this.date.split('-').map(Number)
      return new Date(year, month - 1, day)
    },
    formattedDate() {
      if (Number.isNaN(this.dateObject.getTime())) {
        return this.date
      }

      return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(this.dateObject)
    },
    journeyForDate() {
      const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
        .format(this.dateObject)

      return this.journeys.find(
        (journey) => (journey.weekDay || '').toLowerCase() === weekDay.toLowerCase(),
      )
    },
  },
  mounted() {
    this.loadJourneys()
  },
  methods: {
    async loadJourneys() {
      try {
        const response = await this.$apiClient.get('/journeys')
        this.journeys = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        console.error('Error loading journeys:', error)
        this.journeys = []
      }
    },
    goBackToCalendar() {
      this.$router.push('/calendar-overview')
    },
    openAddJourney() {
      this.$router.push({
        name: 'add-journey',
        query: { date: this.date },
      })
    },
  },
}
</script>

<template>
  <main class="date-overview">
    <button type="button" class="back-button" @click="goBackToCalendar">
      ← Back to calendar
    </button>

    <h1>{{ formattedDate }}</h1>

    <!-- Navigation-only action: opens the existing AddJourney view for the selected date. -->
    <!-- Disabled when a journey exists; update functionality is planned for a future user story. -->
    <button
      type="button"
      class="add-journey-button"
      :disabled="Boolean(journeyForDate)"
      @click="openAddJourney"
    >
      Add Journey
    </button>

    <section v-if="journeyForDate" class="journey-card">
      <dl>
        <div>
          <dt>Start location</dt>
          <dd>{{ journeyForDate.startLocation }}</dd>
        </div>
        <div>
          <dt>Destination</dt>
          <dd>{{ journeyForDate.destination }}</dd>
        </div>
        <div>
          <dt>Week day</dt>
          <dd>{{ journeyForDate.weekDay }}</dd>
        </div>
      </dl>
    </section>

    <p v-else class="no-journey">There is no journey on this date.</p>
  </main>
</template>

<style scoped src="../styles/date-overview.css"></style>
