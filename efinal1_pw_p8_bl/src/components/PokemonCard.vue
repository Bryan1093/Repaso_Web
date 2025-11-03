<template>
  <div class="pokemon-card">
    <img :src="image" :alt="name" width="200" height="200" />
    <p>{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: String,
  name: String
})
</script>

<style scoped>
.pokemon-card {
  text-align: center;
}
img {
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>