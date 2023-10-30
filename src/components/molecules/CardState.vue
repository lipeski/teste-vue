<template>
    <div class="card">
        <img :src="stateImage" alt="State Image" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ stateName }}</h5>
            <p class="card-text">Número de cidades: {{ numCities }}</p>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardState',
    props: {
        stateImage: {
            type: String,
            required: true
        },
        stateName: {
            type: String,
            required: true
        },
        numCities: {
            type: Number,
            required: true
        },
        
    }
}
</script>

<style scoped>
.card {
    width: 18rem;
    margin-bottom: 1rem;
}

.card-img-top {
    height: 10rem;
    object-fit: cover;
}
</style>
