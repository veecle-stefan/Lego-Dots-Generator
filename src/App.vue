<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import VueCroppie from 'vue-croppie';
import Vue from 'vue';

Vue.use(VueCroppie)

export default defineComponent({
  name: 'App'
})
</script>
