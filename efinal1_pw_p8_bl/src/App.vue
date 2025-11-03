<template>
  <div id="app">
    <h1>Juego POKEMON</h1>

    <div class="cards">
      <PokemonCard
        v-for="(card, index) in cards"
        :key="index"
        :image="card.image"
        :name="card.name"
      />
    </div>

    <button @click="jugar" :disabled="intentos >= 5 || puntaje >= 10">
      JUGAR
    </button>

    <GameMessage :intentos="intentos" :puntaje="puntaje" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import PokemonCard from './components/PokemonCard.vue'
import GameMessage from './components/GameMessage.vue'

const intentos = ref(0)
const puntaje = ref(0)

const cards = reactive([
  { image: 'https://placehold.co/200x200/000000/000000.png', name: 'XXXXXXXXXXX' },
  { image: 'https://placehold.co/200x200/000000/000000.png', name: 'XXXXXXXXXXX' },
  { image: 'https://placehold.co/200x200/000000/000000.png', name: 'XXXXXXXXXXX' }
])

const pokemonIds = [1, 4, 7, 25] // Bulbasaur, Charmander, Squirtle, Pikachu

async function jugar() {
  if (intentos.value >= 5 || puntaje.value >= 10) return

  intentos.value++

  const selectedIds = Array.from({ length: 3 }, () =>
    pokemonIds[Math.floor(Math.random() * pokemonIds.length)]
  )

  const results = await Promise.all(
    selectedIds.map(id =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
    )
  )

  for (let i = 0; i < 3; i++) {
    const p = results[i]
    cards[i].name = p.name.charAt(0).toUpperCase() + p.name.slice(1)
    cards[i].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg`
  }

  const names = cards.map(c => c.name)
  const unique = new Set(names)
  if (unique.size === 1) {
    puntaje.value += 5
  } else if (unique.size === 2) {
    puntaje.value += 2
  }
}
</script>

<style>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 20px;
}
.cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}
button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>