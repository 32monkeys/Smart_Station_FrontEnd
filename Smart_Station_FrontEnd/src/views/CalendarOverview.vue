<script>
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default {
  data() {
    return {
      weekDays: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      // Dummy config: start month fixed to October for preview-only calendar.
      startMonthIndex: 9,
      startYear: new Date().getFullYear(),
      visibleMonthOffset: 0,
      // Dummy config: only show a 6-month browsing window.
      totalMonths: 6,
      journeys: [],
    }
  },
  computed: {
    displayedMonthIndex() {
      return (this.startMonthIndex + this.visibleMonthOffset) % 12
    },
    displayedYear() {
      return this.startYear + Math.floor((this.startMonthIndex + this.visibleMonthOffset) / 12)
    },
    displayedMonthLabel() {
      return `${MONTH_NAMES[this.displayedMonthIndex]} ${this.displayedYear}`
    },
    calendarWeeks() {
      const firstDayOfMonth = new Date(this.displayedYear, this.displayedMonthIndex, 1)
      const daysInMonth = new Date(this.displayedYear, this.displayedMonthIndex + 1, 0).getDate()
      const mondayBasedFirstDay = (firstDayOfMonth.getDay() + 6) % 7
      const cells = []

      for (let index = 0; index < mondayBasedFirstDay; index += 1) {
        cells.push(null)
      }

      for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
        cells.push({
          dayNumber,
          hasJourney: this.journeyExists(dayNumber),
        })
      }

      while (cells.length % 7 !== 0) {
        cells.push(null)
      }

      const weeks = []
      for (let index = 0; index < cells.length; index += 7) {
        weeks.push(cells.slice(index, index + 7))
      }

      return weeks
    },
    canGoPrevious() {
      return this.visibleMonthOffset > 0
    },
    canGoNext() {
      return this.visibleMonthOffset < this.totalMonths - 1
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
    formatDate(dayNumber) {
      const month = String(this.displayedMonthIndex + 1).padStart(2, '0')
      const day = String(dayNumber).padStart(2, '0')
      return `${this.displayedYear}-${month}-${day}`
    },
    journeyExists(dayNumber) {
      const date = this.formatDate(dayNumber)

      return this.journeys.some(
        (journey) => String(journey.Date || journey.date || '').slice(0, 10) === date,
      )
    },
    openDate(dayNumber) {
      this.$router.push({
        name: 'date-overview',
        params: { date: this.formatDate(dayNumber) },
      })
    },
    goToPreviousMonth() {
      if (this.canGoPrevious) {
        this.visibleMonthOffset -= 1
      }
    },
    goToNextMonth() {
      if (this.canGoNext) {
        this.visibleMonthOffset += 1
      }
    },
  },
}
</script>

<template>
  <div class="calendar-overview">
    <div class="calendar-header">
      <button type="button" class="month-arrow" :disabled="!canGoPrevious" @click="goToPreviousMonth">
        ←
      </button>
      <h1>{{ displayedMonthLabel }}</h1>
      <button type="button" class="month-arrow" :disabled="!canGoNext" @click="goToNextMonth">
        →
      </button>
    </div>

    <table class="calendar-table">
        <thead>
            <tr>
                <th v-for="day in weekDays" :key="day">{{ day }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex">
              <td
                v-for="(day, dayIndex) in week"
                :key="`${weekIndex}-${dayIndex}`"
                :class="{ 'empty-cell': !day, 'clickable-day': day }"
                :role="day ? 'button' : undefined"
                :tabindex="day ? 0 : undefined"
                :aria-label="day ? `View journeys for ${formatDate(day.dayNumber)}` : undefined"
                @click="day && openDate(day.dayNumber)"
                @keydown.enter="day && openDate(day.dayNumber)"
                @keydown.space.prevent="day && openDate(day.dayNumber)"
              >
                <template v-if="day">
                  <p class="day-number">{{ day.dayNumber }}</p>
                  <p v-if="day.hasJourney" class="journey-status journey-status--yes">Journey</p>
                  <p v-else class="journey-status journey-status--no">No journey</p>
                </template>
                <span v-else>&nbsp;</span>
              </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<style scoped src="../styles/calendar-overview.css"></style>