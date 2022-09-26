import { mount } from "@vue/test-utils";
import FavoriteToggle from "./FavoriteToggle.vue";
import { mainStore } from "../store/main.module";

jest.mock("../store/main.module");

const mockStore = (favorites: number[]) => {
  mainStore.favorites = favorites;
};

describe("Favorite Toggle", () => {
  it("should render button", () => {
    mockStore([]);

    const wrapper = mount(FavoriteToggle, { propsData: { id: 1 } });

    const button = wrapper.find("button.favorite-toggle");
    expect(button.exists()).toBe(true);
  });

  it("should render 'Add to favorite' text", () => {
    mockStore([]);

    const wrapper = mount(FavoriteToggle, { propsData: { id: 1 } });
    const text = wrapper.text();

    expect(text).toBe("Add to favorite");
  });

  it("should render 'Remove from favorite' text and has class favorite", () => {
    mockStore([1]);

    const wrapper = mount(FavoriteToggle, { propsData: { id: 1 } });
    const text = wrapper.text();

    expect(text).toBe("Remove from favorite");
    expect(wrapper.element.classList).toContain("favorite");
  });

  it("should call add method", () => {
    mockStore([]);

    const wrapper = mount(FavoriteToggle, { propsData: { id: 1 } });
    wrapper.trigger("click");

    expect(mainStore.add).toHaveBeenCalledWith(1);
  });

  it("should call remove method", () => {
    mockStore([1]);

    const wrapper = mount(FavoriteToggle, { propsData: { id: 1 } });
    wrapper.trigger("click");

    expect(mainStore.remove).toHaveBeenCalledWith(1);
  });
});
