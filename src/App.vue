<template>
    <v-app>
        <v-layout>
            <side-menu v-if="isLoggedIn"></side-menu>

            <v-main>
                <app-bar v-if="isLoggedIn"></app-bar>
                <router-view/>
            </v-main>

        </v-layout>
    </v-app>
</template>

<script setup>
import AppBar from "./components/_generic/AppBar.vue";
import SideMenu from "./components/_generic/SideMenu.vue";

const isLoggedIn = window.axios.defaults.headers.Authorization.indexOf('null') < 0;
</script>

<style lang="scss">
</style>