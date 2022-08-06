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
    <br>
    <hr>
    <br>
    <button @click="fetchData()">Fetch Data</button>
    <pre v-if="myData">{{ JSON.stringify(myData, null, 3)}}</pre>
    <div>
      <h2>Window Resize</h2>
      <p>Width : {{ width }} Height : {{ height }}</p>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'

import useToggle from "./hooks/useToggle";
import useState from "./hooks/useState";
import useApi from "./hooks/useApi";
import useWindowResize from "./hooks/useWindowResize";


const { visible, toggleVisible } = useToggle(true);
const { state, setState } = useState(0);
const { response, onSendRequest } = useApi("http://jsonplaceholder.typicode.com/photos", {});
const { width, height } = useWindowResize();

const myData = ref()

const fetchData = async () => {
  myData.value = ref()
  await onSendRequest();
  myData.value = response.value;
}

console.log('response', response);


</script>

<style scoped></style>
