<template>
    <v-app-bar flat>
        <v-icon class="mr-5 position-absolute" v-if="!drawer">
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="toggleDrawer"></v-btn>
        </v-icon>
        <v-spacer class="pl-6" v-route-to="'/'">
            Dashboard
        </v-spacer>
        <v-icon class="mr-5" v-route-to="'/contact-log'">
            <font-awesome-icon icon="fas fa-user-cog"/>
        </v-icon>
        <v-icon class="mr-5" v-route-to="'/contact-log/create'">
            <font-awesome-icon :icon="['fas', 'fa-user-check']"/>
        </v-icon>
        <v-icon @click="logout" class="mr-5">
            <font-awesome-icon icon="fas fa-sign-out-alt"/>
        </v-icon>
    </v-app-bar>
</template>

<script>
import {useSideMenuStore} from "@/stores";
import {toRefs} from 'vue';

export default {
    setup() {
        const sideMenuStore = useSideMenuStore();
        const {drawer, toggleDrawer} = toRefs(sideMenuStore);

        return {
            drawer,
            toggleDrawer
        };
    },
    name: "AppBar",
    data() {
        return {}
    },
    methods: {
        async logout() {
            this.$cookies.remove('token');

            setTimeout(function () {
                localStorage.removeItem('user_data');
                localStorage.removeItem('permissions');
                location.reload();
            }, 1000);
        },
    }
}
</script>
