<template>
  <div>
    <button @click="toggleVisible()">Show / Hide</button>
    <div v-show="visible">
      <h2>Hello!</h2>
    </div>
    <br />
    <hr />
    <br />
    <div>
      State Value : {{ state }}
      <br />
      <button @click="setState(state + 1)">Increase Counter</button>
      <button @click="setState(state - 1)">Decrease Counter</button>
    </div>
  </div>
</template>

<script setup>
import useToggle from "./hooks/useToggle";
import useState from "./hooks/useState";

const { visible, toggleVisible } = useToggle(true);
const { state, setState } = useState(0);
</script>

<style scoped></style>
