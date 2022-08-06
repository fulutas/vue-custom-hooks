  <template>
  <div>
      Network Status : {{ networkStatus ?? 'Online'}}
    <br/>
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
      {{ storageToken }}
    </div>
    <br>
    <hr>
    <br>
    <div>Copy to clipboard</div>
    <input type="text" v-model="text" @keyup.enter="copyToClipboard(text)">
    <button @click="copyToClipboard(text)">Copy</button>
  </div>
</template>

<script setup>

import { ref } from 'vue'

import useToggle from "./hooks/useToggle";
import useState from "./hooks/useState";
import useApi from "./hooks/useApi";
import useWindowResize from "./hooks/useWindowResize";
import { useStorage } from "./hooks/useStorage";
import useNetworkStatus from "./hooks/useNetworkStatus";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";


const { visible, toggleVisible } = useToggle(true);
const { state, setState } = useState(0);
const { response, onSendRequest } = useApi("http://jsonplaceholder.typicode.com/photos", {});
const { width, height } = useWindowResize();
const [storageToken, setStorageToken] = useStorage('token', 'local');
setStorageToken('new token');

const myData = ref()
const networkStatus = ref()
const text = ref('')

const fetchData = async () => {
  myData.value = ref()
  await onSendRequest();
  myData.value = response.value;
}

  useNetworkStatus((status) => {
    if(status == 'online') return networkStatus.value = 'Online';
    if(status == 'offline') return networkStatus.value = 'Offline';
  })

  const copyToClipboard = useCopyToClipboard();


</script>

<style scoped></style>
