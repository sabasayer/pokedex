import {
  getAllPokemons,
  getPokemon,
  getPokemonList,
  getPokemonWithId,
} from "./service";

declare let global: any;

const mockFetch = () => {
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    );
};

describe("Service", () => {
  mockFetch();
  it("should call the pokemon api url", async () => {
    await getPokemonList();

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/");
  });

  it("should add limit and offset", async () => {
    await getPokemonList({ limit: 50, offset: 1 });

    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/?limit=50&offset=1"
    );
  });

  it("should call the pokemon api url with url", async () => {
    await getPokemon("https://pokeapi.co/api/v2/pokemon/1");

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
  });

  it("should call the pokemon api url with id", async () => {
    await getPokemonWithId(1);

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
  });

  it("should call all urls", async () => {
    await getAllPokemons([
      "https://pokeapi.co/api/v2/pokemon/1",
      "https://pokeapi.co/api/v2/pokemon/2",
      "https://pokeapi.co/api/v2/pokemon/3",
    ]);

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/2");
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/3");
  });
});
