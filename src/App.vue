<template>
  <div id="app">
    <header>
      <a href="/">
        <img class="logo" src="./assets/logo.png" />
      </a>
      <a href="/">Home</a>
      <a href="/favorites">Favorites</a>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  & > header {
    background-color: var(--primary);
    display: flex;
    padding: var(--spacing);
    align-items: center;
    gap: var(--spacing);
    .logo {
      height: 3rem;
    }
  }
}
</style>
