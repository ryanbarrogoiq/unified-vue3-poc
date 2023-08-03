<template>
  <SampleComponent />
</template>

<script>
import { defineComponent } from 'vue';
import SampleComponent from '../components/SampleComponent.vue';

// Components

export default defineComponent({
  name: 'DashBoard',

  components: {
      SampleComponent,
  },
});
</script>
