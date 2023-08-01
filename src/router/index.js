import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:catchAll(.*)*',
            name: 'not-found',
            component: NotFound,
        }
    ]
})

// Function to load all route modules from the "routes" folder dynamically
async function loadRouteModules() {
    const routeFiles = import.meta.glob('@/modules/*/router.js');

    for (const path in routeFiles) {
        const routeModule = await routeFiles[path]();
        if (routeModule.default) {
            // If the route module exports a "default" object, assume it's a valid route configuration.
            const routeConfig = routeModule.default;
            router.addRoute(routeConfig);
        }
    }
}

// Load and register all route modules
await loadRouteModules();

router.beforeEach((to, from, next) => {
    const isLoggedIn = window.axios.defaults.headers.Authorization.indexOf('null') < 0;

    //Restrict access to protected routes if not logged in
    if (to.meta.requires_auth && !isLoggedIn) {
        router.push({ name: 'login' });
        return;
    }

    //Restrict access to Login page if user is logged in
    if (to.meta.not_for_authenticated && isLoggedIn) {
        router.push({ name: 'dashboard' });
        return;
    }
    
    //Restrict access to non existing routes if not logged in
    if (to.name === 'not-found' && !isLoggedIn) {
        router.push({ name: 'login' });
        return;
    }

    // if (to.meta.permission && localStorage.getItem('permissions') && localStorage.getItem('permissions').indexOf(to.meta.permission.split('_').join(' ').replace(/\w+/g,
    //     function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})) <= -1) {
    //     router.push({name: 'dashboard'})
    //     return
    // }

    next();
})

export default router;
