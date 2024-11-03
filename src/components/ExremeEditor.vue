<script>
import DireCraftingEditor from "@/components/DireCraftingEditor.vue";
import RegularCraftingEditor from "@/components/RegularCraftingEditor.vue";

export default {
  name: 'ExtremeEditor',
  components: {DireCraftingEditor, RegularCraftingEditor},
}
</script>

<template>
  <div id="page">
    <dire-crafting-editor/>
    <regular-crafting-editor/>
  </div>
</template>

<style>
#page {
  display: flex;
  flex-direction: column;
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

.slot-textarea {
  resize: none;
  width: 80px;
  height: 80px;
  text-align: center;
}

label {
  margin-bottom: 10px;
}

.paste-recipe {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  resize: none;
}

.edit-recipe-buttons {
  display: flex;
}

.edit-recipe-buttons > button:nth-child(2) {
  margin-left: 8px;
}

.paste-recipe-butt {
  background-color: #266bff !important;
  margin-top: 8px;
}

.crafted-item-slot {
  border-radius: 10px;
  margin-left: 30px;
  padding: 0;
}

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