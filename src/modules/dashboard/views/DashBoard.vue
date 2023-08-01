<template>
  <HelloWorld />
</template>

<script>
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';

// Components

export default defineComponent({
  name: 'DashBoard',

  components: {
    HelloWorld,
  },
});
</script>
