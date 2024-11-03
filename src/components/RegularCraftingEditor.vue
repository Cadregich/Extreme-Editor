<script>
import {RecipeMixin} from "@/mixins/RecipeMixin";

export default {
  name: 'RegularCraftingEditor',
  mixins: [RecipeMixin],
  data() {
    return {
      slots: Array(3).fill().map(() => Array(3).fill(null)),
      craftedItem: ''
    };
  },
  methods: {
    handleGenerateRecipe() {
      this.showRecipeText(this.slots, this.craftedItem, 'regular');
    },

    handleClearFields() {
      this.clearFields(this.slots);
      this.craftedItem = '';
    }
  }
}
</script>

<template>
  <div id="regular-crafting">
    <div id="editor">
      <div id="crafting-slots">
        <div v-for="row in 3" :key="row" :class="`row row-${row}`">
          <div v-for="slot in 3" :key="slot">
            <textarea class="slot-textarea" v-model="slots[row - 1][slot - 1]" :class="`slot slot-${slot * row}`"></textarea>
          </div>
          <br/>
        </div>
      </div>
      <div id="editor-right-side">
        <div id="crafted-item-slot-block">
          <textarea v-model="craftedItem" class="slot-textarea crafted-item-slot"></textarea>
        </div>
        <div id="crafting-get-result">
          <button @click="handleGenerateRecipe" class="get-result-butt">
            <font-awesome-icon :icon="['fas', 'play']"/>
          </button>
          <button v-if="isRecipeGeneratedOrEditing" @click="copyToClipboard" class="get-result-butt copy-result-butt">
            <font-awesome-icon :icon="['fas', 'copy']"/>
          </button>
          <button v-if="isRecipeGeneratedOrEditing" @click="handleClearFields" class="get-result-butt clear-editor-butt">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
          </button>
        </div>
      </div>
    </div>
    <div id="crafting-result" v-html="resultText" ref="result"></div>
  </div>
</template>


<style scoped>
#regular-crafting {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#editor {
  display: flex;
}

#editor-right-side {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}

#crafting-get-result {
  display: flex;
  align-items: end;
  margin-bottom: 5px;
  margin-left: 30px;
}

#crafting-get-result > *:not(:first-child) {
  margin-left: 20px;
}

#crafting-result {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>