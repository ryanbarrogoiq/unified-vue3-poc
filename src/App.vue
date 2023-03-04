<template>
    <v-app>
        <app-bar v-if="$route.name !== 'login'"></app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from "./components/_generic/AppBar.vue";

export default {
    name: 'App',
    components: {AppBar},
    data: () => ({
        //
    }),
}
</script>

<style lang="scss">
@import "@/assets/styles/sass/style.scss"
</style>