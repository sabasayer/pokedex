<template>
  <PokemonList />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonList from "../components/PokemonList.vue";

@Component({
  components: {
    PokemonList,
  },
})
export default class HomeView extends Vue {}
</script>
