<script>
export default {
  name: 'ExtremeEditor',
  data() {
    return {
      slots: Array(9).fill().map(() => Array(9).fill(null)),
      craftedItem: '',
      resultText: ''
    };
  },
  methods: {
    showRecipeText() {
      this.generateRecipeText();

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

      this.resultText = `mods.avaritia.ExtremeCrafting.addShaped(${this.craftedItem},<br>[[${formattedSlots}]]);`;
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
    }
  }
}
</script>

<template>
  <div id="page">
    <div id="dire-crafting">
      <div id="dire-crafting-slots">
        <div v-for="row in 9" :key="row" :class="`row row-${row}`">
          <div v-for="slot in 9" :key="slot">
            <textarea v-model="slots[row - 1][slot - 1]" :class="`slot slot-${slot * row}`"></textarea>
          </div>
          <br/>
        </div>
      </div>
      <div id="dire-crafting-right-side">
        <div/>
        <div id="crafted-item-slot-block">
          <textarea v-model="craftedItem" id="crafted-item-slot"></textarea>
        </div>
        <div id="dire-crafting-get-result">
          <button @click="showRecipeText"><font-awesome-icon :icon="['fas', 'play']" /></button>
          <button @click="copyToClipboard"><font-awesome-icon :icon="['fas', 'copy']"/></button>
        </div>
      </div>
    </div>
    <div id="result" v-html="resultText" ref="result"></div>
  </div>

</template>

<style>
#page {
  display: flex;
  flex-direction: column;
}

#dire-crafting {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
}

#dire-crafting-slots {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.row {
  display: flex;
  margin-bottom: 5px;
}

.slot {
  display: flex;
  margin-left: 5px;
  margin-bottom: 0;
  margin-top: 0;
  padding: 0;

  border-radius: 10px;
}

textarea {
  resize: none;
  width: 80px;
  height: 80px;
  text-align: center;
}

#dire-crafting-right-side {
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

#dire-crafting-get-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
}

#dire-crafting-get-result > button {
  width: 60px;
  height: 60px;
  background-color: #33d65f;
  border: 0;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 17px;
}

#dire-crafting-get-result > button:nth-child(2) {
  background-color: #6250ff;
  margin-top: 20px;
}

#result {
  display: flex;
  justify-content: center;
  margin-left: 40px;
  margin-top: 20px;
}
</style>