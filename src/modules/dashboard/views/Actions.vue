<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        ACTIONS
      </v-col>
    </v-row>
  </v-container>
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
