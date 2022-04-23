<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ msg: Object }>()

let { msg } = props
const count = ref(0)

const change = () => {
  console.log(msg, 'child')
  props.msg.msg = 'child'
}
</script>

<template>
  <h1 @click="change">{{ msg }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
