<script setup>

</script>

<template>
  <div id="page">
    <div id="dire-crafting">
      <div id="dire-crafting-slots">
        <div v-for="row in 9" :key="row" :class="`row row-${row}`">
          <div v-for="slot in 9" :key="slot">
            <textarea :class="`slot slot-${slot * row}`"></textarea>
          </div>
          <br/>
        </div>
      </div>
      <div id="dire-crafting-right-side">
        <div/>
        <div id="crafted-item-slot-block">
          <textarea id="crafted-item-slot"></textarea>
        </div>
        <div id="dire-crafting-get-result">
          <button type="submit"><font-awesome-icon :icon="['fas', 'play']" /></button>
          <button>
            <font-awesome-icon :icon="['fas', 'copy']"/>
          </button>
        </div>
      </div>
    </div>
    <div id="result">mods.avaritia.ExtremeCrafting.addShaped(null,<br>
      [[null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null],<br>
      [null, null, null, null, null, null, null, null, null]]);
    </div>
  </div>

</template>

<style>
#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  align-items: center;
  justify-content: center;
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
  margin-top: 20px;
}
</style>