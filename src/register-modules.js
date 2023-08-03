import router from "./router";

/* Import Modules Here */
import loginModule from "@/modules/Login";
import dashBoardModule from "@/modules/Dashboard";
import contactLogModule from "@/modules/ContactLog";

const MODULES = ({
    login: loginModule,
    dashboard: dashBoardModule,
    contactLog: contactLogModule,
});

const registerModule = (name, module) => {
    if (module.router) {
        router.addRoute(module.router);
    }
};

export function registerModules() {
    Object.keys(MODULES).forEach(moduleKey => {
        const module = MODULES[moduleKey];
        registerModule(moduleKey, module);
    });
}
