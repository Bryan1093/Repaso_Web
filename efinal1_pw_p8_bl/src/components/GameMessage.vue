<template>
  <div v-if="intentos >= 5 && puntaje < 10" class="message error">
    <p>Ha utilizado tus 5 intentos</p>
    <p>El juego ha terminado, inténtelo otra vez</p>
  </div>
  <div v-else-if="puntaje >= 10" class="message success">
    <p>Puntaje: {{ puntaje }}. Felicitaciones has ganado un premio de $10.000,00</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  intentos: Number,
  puntaje: Number
})
</script>

<style scoped>
.message {
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
}
.error {
  color: red;
}
.success {
  color: blue;
}
</style>