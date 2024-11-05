<template>
  <div id="crafting-get-result">
    <button @click="onGenerateRecipe" class="get-result-butt">
      <font-awesome-icon :icon="['fas', 'play']"/>
    </button>
    <button v-if="isRecipeGeneratedOrEditing" @click="onCopyToClipboard" class="get-result-butt copy-result-butt">
      <font-awesome-icon :icon="['fas', 'copy']"/>
    </button>
    <button v-if="isSlotsNotEmpty || isRecipeGeneratedOrEditing" @click="onClearFields" class="get-result-butt clear-editor-butt">
      <font-awesome-icon :icon="['fas', 'xmark']"/>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CraftingButtons',
  props: {
    isSlotsNotEmpty: Boolean,
    isRecipeGeneratedOrEditing: Boolean,
  },
  emits: ['generateRecipe', 'copyToClipboard', 'clearFields'],
  methods: {
    onGenerateRecipe() {
      this.$emit('generateRecipe');
    },

    onCopyToClipboard() {
      this.$emit('copyToClipboard');
    },

    onClearFields() {
      this.$emit('clearFields');
    }
  }
}
</script>

<style scoped>
.get-result-butt {
  width: 60px;
  height: 60px;
  background-color: #33d65f;
  border: 0;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 17px;
}

.copy-result-butt {
  background-color: #6250ff;
  margin-top: 20px;
}

.clear-editor-butt {
  background-color: #ff413f;
  margin-top: 20px;

}
</style>