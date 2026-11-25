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
      // Dummy mode: this calendar currently has no Axios/API journey payload.
      // Replace with Axios-loaded journey data when backend integration is needed.
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
          // Dummy data: fake journey marker for UI preview.
          // Replace this with Axios data mapping (e.g. hasJourney from /journeys).
          hasJourney: (dayNumber + this.displayedMonthIndex) % 3 === 0,
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
  methods: {
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
              <td v-for="(day, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`" :class="{ 'empty-cell': !day }">
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