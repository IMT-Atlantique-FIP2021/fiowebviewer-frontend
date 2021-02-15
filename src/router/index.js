import { createWebHistory, createRouter } from "vue-router";

import ResultExplorer from "../views/ResultExplorer.vue";

const routes = [
    { 
        path: '/',
        name: "ResultExplorer",
        component: ResultExplorer, // TODO: Replace by "result explorer"
    },
    // TODO: Add 404 Exception
    // {
    //     path: '/:catchAll(.*)',
    //     component: NotFound,
    // }
]

const router = new createRouter({
    history: createWebHistory(),
    routes,
})

export default router;