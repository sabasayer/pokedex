<template>
  <div class="pokemon-list">
    <input placeholder="Search..." v-model="query" />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <TransitionGroup v-else-if="filteredList.length" name="list" tag="main">
      <PokemonCard
        v-for="pokemon in filteredList"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </TransitionGroup>
    <div v-else class="empty-state">There are no pokemon for your search</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getPokemonList, getAllPokemons } from "@/service/service";
import PokemonCard from "../components/PokemonCard.vue";
import { Pokemon, ServiceListResponse } from "@/service/types";
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
  error = "";
  loading = false;

  get filteredList() {
    return this.query
      ? this.pokemons.filter((e) => e.name.indexOf(this.query) > -1)
      : this.pokemons;
  }

  get favorites() {
    return mainStore.favorites;
  }

  async created() {
    this.error = "";
    try {
      this.loading = true;
      const res = await getPokemonList({ limit: 100 });

      let list = res.results;

      if (this.onlyFavorites) list = this.filterFavorites(list);

      this.pokemons = await getAllPokemons(list.map((e) => e.url));
    } catch (error) {
      this.error = (error as Error).toString();
    } finally {
      this.loading = false;
    }
  }

  filterFavorites(list: ServiceListResponse["results"]) {
    return list.filter((e) =>
      this.favorites.some((f) => e.url.endsWith(`/${f}/`))
    );
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
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing);
    padding: var(--spacing);
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }
}
</style>
