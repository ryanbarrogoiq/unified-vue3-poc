<template>
    <v-app-bar>
        <template v-slot:append v-if="!drawer">
            <v-btn variant="text" class="side-bar-drawer" icon="mdi-chevron-right" @click.stop="toggleDrawer"></v-btn>
        </template>

        <v-spacer
            class="pt-1 app-bar-title"
            :class="[
                {'pl-12': !drawer},
                {'pl-6': drawer}
            ]"
        >
            Dashboard
        </v-spacer>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-icon
                    class="mr-5"
                    v-bind="props"
                >
                    <font-awesome-icon icon="fas fa-cog"/>
                </v-icon>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in settings.items"
                    :key="index"
                    :value="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-icon
                    class="mr-5"
                    v-bind="props"
                >
                    <font-awesome-icon icon="fas fa-user-check"/>
                </v-icon>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in settings.items"
                    :key="index"
                    :value="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

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
            toggleDrawer,
        }
    },
    name: "AppBar",
    data() {
        return {
            settings: {
                items: [
                    {title: 'Click Me'},
                    {title: 'Click Me'},
                    {title: 'Click Me'},
                ],
            }
        }
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
