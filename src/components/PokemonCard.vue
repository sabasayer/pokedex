<template>
  <a
    :id="`pokemon-${pokemon.id}`"
    class="pokemon-card"
    tabindex="0"
    aria-label="pokemon card"
    :href="url"
  >
    <div class="img-container">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    </div>
    <h1>{{ pokemon.name }}</h1>
    <div class="actions">
      <FavoriteToggle :id="pokemon.id" />
    </div>
  </a>
</template>

<script lang="ts">
import { Pokemon } from "@/service/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import FavoriteToggle from "./FavoriteToggle.vue";

@Component({
  components: {
    FavoriteToggle,
  },
})
export default class PokemonCard extends Vue {
  @Prop({ required: true }) pokemon!: Pokemon;

  get url() {
    return `/pokemon/${this.pokemon.id}`;
  }
}
</script>

<style lang="scss">
.pokemon-card {
  padding: var(--spacing);
  background-color: var(--white);
  border-radius: var(--border-radious);
  text-decoration: none;
  display: inline-block;
  height: 200px;
  &:hover {
    background-color: var(--white-hover);
  }
  &:active {
    background-color: var(--white-active);
  }
  .img-container {
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  h1 {
    text-align: center;
  }
  .actions {
    button {
      width: 100%;
    }
  }
}
</style>
