import router from "./router";

const registerModule = (name, module) => {
    if (module.router) {
        router.addRoute(module.router);
    }
};

export const registerModules = modules => {
    Object.keys(modules).forEach(moduleKey => {
        const module = modules[moduleKey];
        registerModule(moduleKey, module);
    });
};