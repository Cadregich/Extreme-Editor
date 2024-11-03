import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            direCraftingSlots: Array(9).fill().map(() => Array(9).fill(null)),
            // direCraftingCraftedItem: '',
            recipeRawText: '',
        };
    },
    getters: {
        getDireCraftingSlots: (state) => state.direCraftingSlots,
        // getDireCraftingCraftedItem: (state) => state.direCraftingCraftedItem,
        getRecipeRawText: (state) => state.recipeRawText,
    },
    mutations: {
        setRecipeRawText(state, text) {
            state.recipeRawText = text;
        },
        clearRecipeRawText(state) {
            state.recipeRawText = '';
        },
    },
    actions: {
        updateRecipeRawText({ commit }, text) {
            commit('setRecipeRawText', text);
        },
        clearRecipeRawText({ commit }) {
            commit('clearRecipeRawText');
        },
    },
});

export default store;