import {defineStore} from 'pinia'

export const useSideMenuStore = defineStore('sideMenuStore', {
    state: () => ({
        drawer: true,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        toggleDrawer() {
          this.drawer = !this.drawer;
        },
    },
})
