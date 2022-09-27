import { store } from "./index";
import {
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

const updateLocaleStorage = (data: number[]) =>
  localStorage.setItem("favorites", JSON.stringify(data));

const getFromLocaleStorage = (): number[] =>
  JSON.parse(localStorage.getItem("favorites") || "[]") || [];

@Module({
  name: "main",
  dynamic: true,
  store,
  namespaced: true,
})
class MainModule extends VuexModule {
  favorites: number[] = getFromLocaleStorage();

  @Mutation
  add(id: number) {
    if (this.favorites.includes(id)) return;

    this.favorites.push(id);
    updateLocaleStorage(this.favorites);
  }

  @Mutation
  remove(id: number) {
    const index = this.favorites.indexOf(id);

    if (!~index) return;

    this.favorites.splice(index, 1);
    updateLocaleStorage(this.favorites);
  }
}

export const mainStore = getModule(MainModule);
