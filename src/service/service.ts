import { Pokemon, ServiceListResponse, ServiceRequestParams } from "./types";

const createQueryString = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

export const getPokemonList = async (
  params?: ServiceRequestParams
): Promise<ServiceListResponse> => {
  const query = params
    ? `?${createQueryString(params as Record<string, string>)}`
    : "";

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  return res.json();
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const res = await fetch(url);
  return res.json();
};

export const getPokemonWithId = async (id: number): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
};

export const getAllPokemons = async (urls: string[]) => {
  return await Promise.all(urls.map((url) => getPokemon(url)));
};
