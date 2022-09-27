<template>
  <div class="pokemon">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <h1>
      {{ pokemon.name }}
    </h1>
    <div class="">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      <img :src="pokemon.sprites.back_default" :alt="pokemon.name" />
    </div>
    <section>
      <h2>Sizes</h2>
      <p>weight: {{ pokemon.weight }}</p>
      <p>height: {{ pokemon.height }}</p>
    </section>
    <section>
      <h2>Moves</h2>
      <div class="moves">
        <span v-for="move in pokemon.moves" :key="move.move.name">
          {{ move.move.name }}</span
        >
      </div>
    </section>
    <section>
      <h2>Actions</h2>
      <div class="actions">
        <a href="/">Go Back</a>
        <FavoriteToggle :id="pokemon.id" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getPokemonWithId } from "@/service/service";
import PokemonCard from "../components/PokemonCard.vue";
import { Pokemon } from "@/service";
import FavoriteToggle from "../components/FavoriteToggle.vue";

@Component({
  components: {
    PokemonCard,
    FavoriteToggle,
  },
})
export default class PokemonView extends Vue {
  pokemon: Pokemon = {
    id: 1,
    name: "",
    sprites: { front_default: "" },
  };
  loading = false;
  error = "";

  async created() {
    const id = Number(this.$route.params?.id);
    if (!id) return;

    this.getPokemon(+id);
  }

  async getPokemon(id: number) {
    this.error = "";

    try {
      this.loading = true;
      this.pokemon = await getPokemonWithId(id);
    } catch (error) {
      this.error = (error as Error).toString();
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style lang="scss">
.pokemon {
  padding: var(--spacing);
  .moves {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing);
    span {
      background-color: var(--white);
      padding: calc(var(--spacing) / 2);
      border-radius: var(--border-radious);
    }
  }
  section {
    border-top: 1px solid var(--border-color);
    margin-top: var(--spacing);
  }
  .actions {
    display: flex;
    gap: var(--spacing);
    align-items: center;
  }
}
</style>
