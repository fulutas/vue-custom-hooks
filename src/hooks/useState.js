import { ref } from 'vue'

const useState = (initalState) => {
    const state = ref(initalState)
    
    const setState = (newValue) => {
        state.value = newValue;
    }

    return {state, setState}
}

export default useState