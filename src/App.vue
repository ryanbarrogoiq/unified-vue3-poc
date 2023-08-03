<template>
    <v-app>
        <side-menu v-if="isLoggedIn"></side-menu>
        <app-bar v-if="isLoggedIn"></app-bar>

        <v-main :class="[{'logged-in': isLoggedIn}]">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script setup>
import AppBar from "@/components/_generic/AppBar.vue";
import SideMenu from "@/components/_generic/SideMenu.vue";

const isLoggedIn = window.axios.defaults.headers.Authorization.indexOf('null') < 0;
</script>

<style lang="scss">
</style>