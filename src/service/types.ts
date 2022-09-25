export interface ServiceRequestParams {
  limit?: number;
  offset?: number;
}

export interface ServiceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  weight?: number;
  height?: number;
  sprites: {
    front_default: string;
    back_default?: string;
  };
  moves?: PokemonMove[];
}
