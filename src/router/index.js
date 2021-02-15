import { createWebHistory, createRouter } from "vue-router";

import Dashboard from "../views/Dashboard.vue";

const routes = [
    { 
        path: '/',
        name: "Dashboard",
        component: Dashboard, // TODO: Replace by "result explorer"
    }
]

const router = new createRouter({
    history: createWebHistory(),
    routes,
})

export default router;