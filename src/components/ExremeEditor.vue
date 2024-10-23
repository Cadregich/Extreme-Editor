<script>
import DireCraftingEditor from "@/components/DireCraftingEditor.vue";
export default {
  name: 'ExtremeEditor',
  components: {DireCraftingEditor},
}
</script>

<template>
  <div id="page">
    <dire-crafting-editor/>
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

textarea {
  resize: none;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>