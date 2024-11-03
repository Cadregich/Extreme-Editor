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
      const recipeItems = this.getItemsFromRawRecipe().items;
      const recipeCraftedItem = this.getItemsFromRawRecipe().addShapedValue;
      const recipeType = this.getRecipeType(recipeItems);

      const editorItemsArray = this.generateEditorItemsArray(recipeItems, recipeType);

      if (recipeType === 'dire') {
        this.$store.state.direCraftingSlots = editorItemsArray;
        this.$store.state.direCraftingCraftedItem = recipeCraftedItem;
      } else if (recipeType === 'regular') {
        this.$store.state.regularCraftingCraftedItem = recipeCraftedItem;
        this.$store.state.regularCraftingSlots = editorItemsArray;
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    },

    getRecipeType(recipeItems) {
      if (recipeItems.length === 81) {
        return 'dire';
      } else if (recipeItems.length === 9) {
        return 'regular';
      }

      console.error(`Неизвестный тип рецепта: длина массива ${recipeItems.length} не соответствует ожидаемым значениям.`);
    },

    generateEditorItemsArray(recipeItems, recipeType) {
      let arrayLength = 0;
      if (recipeType === 'dire') {
        arrayLength = 9;
      } else if (recipeType === 'regular') {
        arrayLength = 3;
      }

      const newArray = Array.from({ length: arrayLength }, () => Array(arrayLength).fill(null));

      for (let i = 0; i < arrayLength; i++) {
        for (let j = 0; j < arrayLength; j++) {
          newArray[i][j] = recipeItems[i * arrayLength + j] || null;
        }
      }

      console.log(newArray);

      return newArray;
    },

    getItemsFromRawRecipe() {
      const addShapedMatch = this.recipeRawText.match(/addShaped\(([^,]+)/);
      const addShapedValue = addShapedMatch ? addShapedMatch[1].trim().replace(/^'|'$/g, '') : '';

      console.log(addShapedValue);

      const matches = this.recipeRawText.match(/(?<=\[\[)[^\]]+(?=\])/g);
      this.isRecipeGeneratedOrEditing = true;

      const items = matches ? matches.flatMap(item => item.split(',').map(i => {
        const trimmedItem = i.trim().replace(/^'|'$/g, '');
        return trimmedItem === 'null' ? '' : trimmedItem;
      })) : [];

      return { items, addShapedValue };
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