<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ msg: Object }>()

const {msg} = props
const change = () => {
  console.log('change----',props.msg)
  msg.msg= '11111111111111'
}
</script>

<template>
  <h1 @click="change">{{ msg }}</h1>
</template>
<style>
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
