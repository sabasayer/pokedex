<template>
  <div class="pokemon-list">
    <input placeholder="Search..." v-model="query" />
    <main>
      <PokemonCard
        v-for="pokemon in filteredList"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getPokemonList, getAllPokemons } from "@/service/service";
import PokemonCard from "../components/PokemonCard.vue";
import { Pokemon } from "@/service/types";
import { mainStore } from "@/store/main.module";

@Component({
  components: {
    PokemonCard,
  },
})
export default class PokemonList extends Vue {
  @Prop({ default: false, type: Boolean }) onlyFavorites!: boolean;

  pokemons: Pokemon[] = [];
  query = "";

  get filteredList() {
    return this.query
      ? this.pokemons.filter((e) => e.name.indexOf(this.query) > -1)
      : this.pokemons;
  }

  get favorites() {
    return mainStore.favorites;
  }

  async created() {
    const res = await getPokemonList({ limit: 100 });
    let list = res.results;

    if (this.onlyFavorites)
      list = list.filter((e) =>
        this.favorites.some((f) => e.url.endsWith(`/${f}/`))
      );

    this.pokemons = await getAllPokemons(list.map((e) => e.url));
  }
}
</script>
<style lang="scss">
.pokemon-list {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  input {
    border-radius: var(--border-radious);
    border: 1px solid var(--gray);
    padding: var(--spacing);
    margin: var(--spacing);
  }
  main {
    flex: 1;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing);
    padding: var(--spacing);
  }
}
</style>
