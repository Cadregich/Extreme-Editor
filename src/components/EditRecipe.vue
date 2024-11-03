<script>
export default {
  name: "EditRecipe",
  data() {
    return {
      direCraftingSlots: Array(9).fill().map(() => Array(9).fill(null)),
    };
  },
  computed: {
    recipeRawText: {
      get() {
        return this.$store.getters.getRecipeRawText;
      },
      set(value) {
        this.$store.dispatch('updateRecipeRawText', value);
      },
    },
  },
  methods: {
    editRecipe() {
      const recipeItems = this.getItemsFromRawRecipe();
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.direCraftingSlots[i][j] = recipeItems[i * 9 + j] || null;
        }
      }
      this.$store.state.direCraftingSlots = this.direCraftingSlots;
    },

    getItemsFromRawRecipe() {
      const matches = this.recipeRawText.match(/(?<=\[\[)[^\]]+(?=\])/g);
      this.isRecipeGeneratedOrEditing = true;
      return matches ? matches.flatMap(item => item.split(',').map(i => {
        const trimmedItem = i.trim().replace(/^'|'$/g, '');
        return trimmedItem === 'null' ? '' : trimmedItem;
      })) : [];
    },

    pasteFromClipboard() {
      navigator.clipboard.readText()
          .then(text => {
            this.recipeRawText = text;
          })
          .catch(error => {
            console.error('Не удалось получить текст из буфера обмена', error);
          });
    }
  },
};
</script>

<template>
  <div style="display: flex; flex-direction: column; margin-left: 30px">
    <label for="slot-textarea">Редактировать рецепт</label>
    <textarea v-model="recipeRawText" class="paste-recipe"/>
    <div class="edit-recipe-buttons">
      <button @click="pasteFromClipboard" class="paste-recipe-butt get-result-butt">
        <font-awesome-icon :icon="['fas', 'paste']"/>
      </button>
      <button @click="editRecipe" class="paste-recipe-butt get-result-butt">
        <font-awesome-icon :icon="['fas', 'play']"/>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>