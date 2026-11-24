<script>
import axios from 'axios';
export default {
    data() {
        return {
            journeyData:
            {
                id:0,
                destination: ""
            }
        };
    },
    methods: {
        async submitForm() {
            try {
            const response = await axios.post("https://localhost:7209/api/journeys",this.journeyData);
            // Handle form submission logic here
            console.log('End Station:', this.journeyData.destination);
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
                <label for="destination">End Station:</label>
                <input type="text" id="destination" v-model="journeyData.destination" required />
            </div>
            <button type="submit">Add Journey</button>
        </form>
    </div>
</template>