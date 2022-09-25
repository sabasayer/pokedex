<template>
  <button
    class="favorite-toggle"
    @click.prevent="toggle"
    :class="{ favorite: isFavorite }"
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mainStore } from "../store/main.module";

@Component
export default class FavoriteToggle extends Vue {
  @Prop({ required: true }) id!: number;

  get text() {
    return this.isFavorite ? "Remove from favorite" : "Add to favorite";
  }

  get isFavorite() {
    return mainStore.favorites.includes(this.id);
  }

  toggle() {
    if (this.isFavorite) mainStore.remove(this.id);
    else mainStore.add(this.id);
  }
}
</script>
<style lang="scss">
.favorite-toggle {
  background-color: var(--primary);
  color: var(--white);
  border: none;
  padding: var(--spacing);
  border-radius: var(--border-radious);
  cursor: pointer;
  &.favorite {
    background-color: var(--secondary);
    color: var(--white);
  }
}
</style>
