<script>
export default {
  name: 'DireCraftingEditor',
  data() {
    return {
      slots: Array(9).fill().map(() => Array(9).fill(null)),
      craftedItem: '',
      resultText: '',
      isRecipeGenerated: false
    };
  },
  methods: {
    showRecipeText() {
      this.generateRecipeText();
      this.isRecipeGenerated = true;

      this.$nextTick(() => {
        const resultElement = this.$refs.result;
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },

    generateRecipeText() {
      const formattedSlots = this.slots.map(row =>
          `${row.map(item => item === null ? 'null' : `'${item}'`).join(', ')}`
      ).join(',' + "<br>");

      let craftedItem = this.craftedItem === "" ? "null" : this.craftedItem;
      this.resultText = `mods.avaritia.ExtremeCrafting.addShaped(${craftedItem},<br>[[${formattedSlots}]]);`;
    },

    copyToClipboard() {
      const resultText = this.resultText.replace(/<br\s*\/?>/g, '\n');

      navigator.clipboard.writeText(resultText)
          .then(() => {
            alert('Рецепт скопирован в буфер обмена!');
          })
          .catch(err => {
            console.error('Ошибка при копировании: ', err);
          });
    },

    clearFields() {
      const isConfirmed = confirm("Вы уверены, что хотите очистить рецепт и поля?");
      if (isConfirmed) {
        this.slots = Array(9).fill().map(() => Array(9).fill(null));
        this.craftedItem = '';
        this.resultText = '';
        this.isRecipeGenerated = false;
      }
    }
  }
}
</script>

<template>
  <div id="dire-crafting">
    <div id="editor">
      <div id="crafting-slots">
        <div v-for="row in 9" :key="row" :class="`row row-${row}`">
          <div v-for="slot in 9" :key="slot">
            <textarea v-model="slots[row - 1][slot - 1]" :class="`slot slot-${slot * row}`"></textarea>
          </div>
          <br/>
        </div>
      </div>
      <div id="editor-right-side">
        <div/>
        <div id="crafted-item-slot-block">
          <textarea v-model="craftedItem" id="crafted-item-slot"></textarea>
        </div>
        <div id="crafting-get-result">
          <button @click="showRecipeText"><font-awesome-icon :icon="['fas', 'play']" /></button>
          <button v-if="isRecipeGenerated" @click="copyToClipboard"><font-awesome-icon :icon="['fas', 'copy']"/></button>
          <button v-if="isRecipeGenerated" @click="clearFields" ><font-awesome-icon :icon="['fas', 'xmark']"/></button>
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

#crafted-item-slot {
  border-radius: 10px;
  margin-left: 30px;
  padding: 0;
}

#crafting-get-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
}

#crafting-get-result > button {
  width: 60px;
  height: 60px;
  background-color: #33d65f;
  border: 0;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 17px;
}

#crafting-get-result > button:nth-child(2) {
  background-color: #6250ff;
  margin-top: 20px;
}

#crafting-get-result > button:nth-child(3) {
  background-color: #ff413f;
  margin-top: 20px;
}

#crafting-result {
  display: flex;
  justify-content: center;
  margin-left: 40px;
  margin-top: 20px;
}
</style>