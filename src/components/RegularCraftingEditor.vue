<script>
import {RecipeMixin} from "@/mixins/RecipeMixin";
import CraftingButtons from "@/components/CraftingButtons.vue";

export default {
  name: 'RegularCraftingEditor',
  components: {CraftingButtons},
  mixins: [RecipeMixin],
  computed: {
    isSlotsNotEmpty() {
      return this.slots.some(innerArray =>
          innerArray.some(value => value !== null)
      );
    },

    slots() {
      return this.$store.getters.getRegularCraftingSlots;
    },

    craftedItem: {
      get() {
        return this.$store.getters.getRegularCraftingCraftedItem;
      },
      set(value) {
        this.$store.state.regularCraftingCraftedItem = value;
      },
    },
  },
  methods: {
    handleGenerateRecipe() {
      this.showRecipeText(this.slots, this.craftedItem, 'regular');
    },

    handleClearFields() {
      if (this.clearFields(this.slots)) {
        this.craftedItem = '';
      }
    },

    handlePasteFromClipboard(event) {
      this.fastPasteFromClipboard(event);
    },

    handleClearSlot(event) {
      this.fastCleanSlot(event);
    }
  }
}
</script>

<template>
  <div id="regular-crafting">
    <div id="editor">
      <div id="crafting-slots">
        <div v-for="(row, rowIndex) in 3" :key="row" :class="`row row-${row}`">
          <div v-for="(slot, slotIndex) in 3" :key="slot">
            <textarea class="slot-textarea"
                      v-model="slots[rowIndex][slotIndex]"
                      :data-row="rowIndex"
                      :data-slot="slotIndex"
                      @dblclick="handlePasteFromClipboard"
                      @contextmenu="handleClearSlot"
                      :class="`slot slot-${slot * row}`"></textarea>
          </div>
          <br/>
        </div>
      </div>
      <div id="editor-right-side">
        <label id="remove-old-recipe-label">
          Удалять старый рецепт:
          <input v-model="addRemoveOldRegularRecipeText" class="remove-old-recipe-checkbox" type="checkbox"
                 style="margin-left: 20px"/>
        </label>
        <div id="crafted-item-slot-block">
          <textarea v-model="craftedItem"
                    @dblclick="handlePasteFromClipboard"
                    @contextmenu="handleClearSlot"
                    class="slot-textarea crafted-item-slot"></textarea>
        </div>
        <CraftingButtons
            :isSlotsNotEmpty="isSlotsNotEmpty"
            :isRecipeGeneratedOrEditing="isRecipeGeneratedOrEditing"
            @generateRecipe="handleGenerateRecipe"
            @copyToClipboard="copyToClipboard"
            @clearFields="handleClearFields"/>
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

#remove-old-recipe-label {
  display: flex;
  align-items: center;
  margin-left: 10px
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