import { shallowMount } from "@vue/test-utils";
import PokemonList from "./PokemonList.vue";
import { getPokemonList, getAllPokemons } from "../service/service";
import { Pokemon, ServiceListResponse } from "@/service";
import flushPromises from "flush-promises";
import { mainStore } from "@/store/main.module";

jest.mock("../store/main.module");
jest.mock("../service/service");

const mock = (results: ServiceListResponse["results"]) => {
  const response: ServiceListResponse = {
    count: 1,
    next: "",
    previous: "",
    results,
  };
  (getPokemonList as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(response)
  );
};

const mockAllPokemons = (pokemons: Pokemon[]) => {
  (getAllPokemons as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(pokemons)
  );
};

describe("Pokemon List", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should render element with class", () => {
    mock([]);
    mockAllPokemons([]);

    const wrapper = shallowMount(PokemonList);

    expect(wrapper.element.className).toBe("pokemon-list");
  });

  it("should render pokemon card components", async () => {
    mock([
      { name: "test", url: "test.url" },
      { name: "test2", url: "test2.url" },
    ]);
    mockAllPokemons([
      { id: 1, name: "test", sprites: { front_default: "test.png" } },
      { id: 2, name: "test2", sprites: { front_default: "test2.png" } },
    ]);

    const wrapper = shallowMount(PokemonList);

    await flushPromises();

    const pokemonStubs = wrapper.findAll("pokemoncard-stub");
    const transitionStub = wrapper.findAll("transitiongroup-stub");

    expect(getPokemonList).toHaveBeenCalledWith({ limit: 100 });
    expect(getAllPokemons).toHaveBeenCalledWith(["test.url", "test2.url"]);
    expect(pokemonStubs.length).toBe(2);
    expect(transitionStub.exists()).toBe(true);
  });

  it("should render filtered list", async () => {
    mock([
      { name: "test", url: "test.url" },
      { name: "test2", url: "test2.url" },
    ]);
    mockAllPokemons([
      { id: 1, name: "test", sprites: { front_default: "test.png" } },
      { id: 2, name: "test2", sprites: { front_default: "test2.png" } },
    ]);

    const wrapper = shallowMount(PokemonList);
    await flushPromises();

    wrapper.find("input").setValue("2");

    await wrapper.vm.$nextTick();
    const pokemonStubs = wrapper.findAll("pokemoncard-stub");

    expect(pokemonStubs.length).toBe(1);
  });

  it("should render only favorites", async () => {
    mock([
      { name: "test", url: "test.url/1/" },
      { name: "test2", url: "test.url/2/" },
    ]);
    mockAllPokemons([
      { id: 2, name: "test2", sprites: { front_default: "test2.png" } },
    ]);

    mainStore.favorites = [2];

    const wrapper = shallowMount(PokemonList, {
      propsData: {
        onlyFavorites: true,
      },
    });

    await flushPromises();
    const pokemonStubs = wrapper.findAll("pokemoncard-stub");

    expect(getAllPokemons).toHaveBeenCalledWith(["test.url/2/"]);
    expect(pokemonStubs.length).toBe(1);
  });
});
