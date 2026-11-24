<script>
import axios from 'axios';
export default {
    data() {
        return {
            journeyData:
            {
                id:1,
                endStation: ''
            }
        };
    },
    methods: {
        async submitForm() {
            try {
            const response = await axios.post("https://localhost:7209/api/journeys",this.journeyData);
            // Handle form submission logic here
            console.log('End Station:', this.journeyData);
            // You can also send the data to an API or perform other actions as needed
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    },
};
</script>
<template>
    <div class="add-journey">
        <form @submit.prevent="submitForm">
            <div>
                <label for="endStation">End Station:</label>
                <input type="text" id="endStation" v-model="journeyData.endStation" required />
            </div>
            <button type="submit">Add Journey</button>
        </form>
    </div>
</template>