import { Pokemon } from "@/service";
import { shallowMount } from "@vue/test-utils";
import PokemonCard from "./PokemonCard.vue";

describe("Pokemon Card Component", () => {
  it("should render the relevant html elements", () => {
    const pokemon: Pokemon = {
      id: 1,
      name: "test",
      sprites: {
        front_default: "test_url",
      },
    };
    const wrapper = shallowMount(PokemonCard, {
      propsData: { pokemon },
    });

    const img = wrapper.find("img");
    const h1 = wrapper.find("h1");
    const a = wrapper.find(".pokemon-card");
    const url = a.attributes().href;

    expect(a.attributes().id).toBe(`pokemon-${pokemon.id}`);
    expect(url).toBe(`/pokemon/${pokemon.id}`);
    expect(img.attributes().src).toBe(pokemon.sprites.front_default);
    expect(h1.text()).toBe(pokemon.name);
  });
});
