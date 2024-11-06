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

.remove-old-recipe-checkbox {
  transform: scale(2);
}

.crafted-item-slot {
  border-radius: 10px;
  margin-left: 30px;
  padding: 0;
}
</style>