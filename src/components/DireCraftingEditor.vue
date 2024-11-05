<script>
import {RecipeMixin} from "@/mixins/RecipeMixin";
import EditRecipe from "@/components/EditRecipe.vue";
import CraftingButtons from "@/components/CraftingButtons.vue";

export default {
  name: 'DireCraftingEditor',
  components: {CraftingButtons, EditRecipe},
  mixins: [RecipeMixin],
  computed: {
    isSlotsNotEmpty() {
      return this.slots.some(innerArray =>
          innerArray.some(value => value !== null && value !== undefined && value !== '')
      );
    },

    slots() {
      return this.$store.getters.getDireCraftingSlots;
    },

    craftedItem: {
      get() {
        return this.$store.getters.getDireCraftingCraftedItem;
      },
      set(value) {
        this.$store.state.direCraftingCraftedItem = value;
      },
    },
  },
  mounted() {
    console.log(this.slots);
  },
  methods: {
    handleGenerateRecipe() {
      this.showRecipeText(this.slots, this.craftedItem, 'dire');
    },

    handleClearFields() {
      if (this.clearFields(this.slots)) {
        this.craftedItem = '';
      }
    },

    handlePasteFromClipboard(event) {
      console.log(event);
      this.fastPasteFromClipboard(event);
    },

    handleClearSlot(event) {
      console.log(event);
      this.fastCleanSlot(event);
    }
  }
}
</script>

<template>
  <div id="dire-crafting">
    <div id="editor">
      <div id="crafting-slots">
        <div v-for="(row, rowIndex) in 9" :key="row" :class="`row row-${row}`">
          <div v-for="(slot, slotIndex) in 9" :key="slot">
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
        <edit-recipe/>
        <div style="display: grid; grid-template-rows: 1fr 1fr 1fr">
          <div style="display: flex; align-items: center; justify-content: center; margin-left: 10px">
            <label style="display: flex; align-items: center;">
              Удалять старый рецепт:
              <input v-model="addRemoveOldRecipeText" class="removeOldRecipeCheckbox" type="checkbox"
                     style="margin-left: 20px"/>
            </label>
          </div>
          <div id="crafted-item-slot-block">
            <textarea @dblclick="handlePasteFromClipboard"
                      @contextmenu="handleClearSlot"
                      v-model="craftedItem"
                      class="slot-textarea crafted-item-slot"></textarea>
          </div>
          <div/>
        </div>
        <CraftingButtons
            :isSlotsNotEmpty="isSlotsNotEmpty"
            :isRecipeGeneratedOrEditing="isRecipeGeneratedOrEditing"
            @generateRecipe="handleGenerateRecipe"
            @copyToClipboard="copyToClipboard"
            @clearFields="handleClearFields"
        />
      </div>
    </div>
    <div id="crafting-result-block">
      <div id="crafting-result" v-html="resultText" ref="result"></div>
    </div>

  </div>
</template>


<style scoped>
#dire-crafting {
  margin-top: 50px;
}

#editor {
  display: flex;
  justify-content: center;
}

#crafting-slots {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#editor-right-side {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}

#crafted-item-slot-block {
  display: flex;
  align-items: center;
}

#crafting-get-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
}

#crafting-result-block {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>