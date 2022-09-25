<template>
  <PokemonList only-favorites />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonList from "../components/PokemonList.vue";

@Component({
  components: {
    PokemonList,
  },
})
export default class FavoritesView extends Vue {}
</script>
