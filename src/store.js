import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            direCraftingSlots: Array(9).fill().map(() => Array(9).fill(null)),
            regularCraftingSlots: Array(3).fill().map(() => Array(3).fill(null)),
            regularCraftingCraftedItem: '',
            direCraftingCraftedItem: '',
            recipeRawText: '',
        };
    },
    getters: {
        getDireCraftingSlots: (state) => state.direCraftingSlots,
        getRegularCraftingSlots: (state) => state.regularCraftingSlots,
        getRegularCraftingCraftedItem: (state) => state.regularCraftingCraftedItem,
        getDireCraftingCraftedItem: (state) => state.direCraftingCraftedItem,
        getRecipeRawText: (state) => state.recipeRawText,
    },
    mutations: {
        setRecipeRawText(state, text) {
            state.recipeRawText = text;
        },
    },
    actions: {
        updateRecipeRawText({ commit }, text) {
            commit('setRecipeRawText', text);
        },
    },
});

export default store;