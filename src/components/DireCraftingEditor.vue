<script>
import { RecipeMixin} from "@/mixins/RecipeMixin";
import EditRecipe from "@/components/EditRecipe.vue";

export default {
  name: 'DireCraftingEditor',
  components: {EditRecipe},
  mixins: [RecipeMixin],
  data() {
    return {
      craftedItem: ''
    }
  },
  computed: {
    isSlotsNotEmpty() {
      return this.slots.some(innerArray =>
          innerArray.some(value => value !== null)
      );
    },

    slots() {
      return this.$store.getters.getDireCraftingSlots;
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
      this.clearFields(this.slots);
      this.craftedItem = '';
      this.$store.dispatch('clearRecipeRawText');
    },
  }
}
</script>

<template>
  <div id="dire-crafting">
    <div id="editor">
      <div id="crafting-slots">
        <div v-for="row in 9" :key="row" :class="`row row-${row}`">
          <div v-for="slot in 9" :key="slot">
            <textarea class="slot-textarea" v-model="slots[row - 1][slot - 1]" :class="`slot slot-${slot * row}`"></textarea>
          </div>
          <br/>
        </div>
      </div>
      <div id="editor-right-side">
        <edit-recipe/>
        <div id="crafted-item-slot-block">
          <textarea v-model="craftedItem" class="slot-textarea crafted-item-slot"></textarea>
        </div>
        <div id="crafting-get-result">
          <button @click="handleGenerateRecipe" class="get-result-butt">
            <font-awesome-icon :icon="['fas', 'play']" />
          </button>
          <button v-if="isRecipeGeneratedOrEditing" @click="copyToClipboard" class="get-result-butt copy-result-butt">
            <font-awesome-icon :icon="['fas', 'copy']"/>
          </button>
          <button v-if="isSlotsNotEmpty || isRecipeGeneratedOrEditing" @click="handleClearFields" class="get-result-butt clear-editor-butt">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
          </button>
        </div>
      </div>
    </div>
    <div id="crafting-result" v-html="resultText" ref="result"></div>
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

#crafting-result {
  display: flex;
  justify-content: center;
  margin-left: 40px;
  margin-top: 20px;
}
</style>