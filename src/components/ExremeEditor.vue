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
      <div id="result">
        <textarea class="result"></textarea>
      </div>
    </div>

  </div>
</template>

<style>
#page {
  display: flex;
  justify-content: center;
}

#dire-crafting {
  display: flex;
  align-items: center;
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
}

textarea {
  resize: none;
  width: 80px;
  height: 80px;
  text-align: center;
}

.row {
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

.result {
  border-radius: 10px;
  margin-left: 30px;
  padding: 0;
}

</style>