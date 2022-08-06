  <template>
  <div>
      Network Status : {{ networkStatus ?? 'Online'}}
    <br/>
    <br>
    <div>
      Device Type : {{ device }}
    </div>
    <br>
    <div>
      <h2>Window Resize</h2>
      <p>Width : {{ width }} Height : {{ height }}</p>
    </div>
    <br>
    <button @click="toggleVisible()">Show / Hide</button>
    <div v-show="visible">
      <h2>Hello!</h2>
    </div>
    <br />
    <br />
    <div>
      State Value : {{ state }}
      <br />
      <button @click="setState(state + 1)">Increase Counter</button>
      <button @click="setState(state - 1)">Decrease Counter</button>
    </div>
    <br>
    <br>
    <div>
    <button @click="fetchData()">Fetch Data</button>
    <pre v-if="myData">{{ JSON.stringify(myData, null, 3)}}</pre>
    </div>
    <br>
    <br>
    <div>
       <h2>Storage</h2>
       <p>{{ storageToken }}</p>
    </div>
    <br>
    <br>
    <div>Copy to clipboard</div>
    <input type="text" v-model="text" @keyup.enter="copyToClipboard(text)">
    <button @click="copyToClipboard(text)">Copy</button>
    <br>
    <br>
    <div>
      <button @click="changeTheme('dark')">Dark Theme</button>
      <button @click="changeTheme('default')">Light Theme</button>
    </div>
    <br>
    <div ref="container">View click outside!</div>
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
import useTheme from "./hooks/useTheme";
import usePageVisibility from "./hooks/usePageVisibility";
import { useViewport } from "./hooks/useViewport";
import { useOnClickOutside } from "./hooks/useOnClickOutside";


const { visible, toggleVisible } = useToggle(true);
const { state, setState } = useState(0);
const { response, onSendRequest } = useApi("http://jsonplaceholder.typicode.com/photos", {});
const { width, height } = useWindowResize();
const [storageToken, setStorageToken] = useStorage('token', 'local');
setStorageToken('new token');

const myData = ref()
const networkStatus = ref()
const text = ref('')
const container = ref(null);

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

const changeTheme = useTheme();

usePageVisibility((hidden) => {
   console.log(hidden)
   console.log(`User is ${hidden ? ' not' : ''} focus your site`);
});

const { device } = useViewport({ mobile: 700, tablet: 900 });

useOnClickOutside(container, () => {
  console.log('Clicked outside'); 
})

</script>

<style scoped></style>
