# Project setup

## Vite | Next Generation Frontend Tooling

> Prerequisite:
> Install [NodeJS 14.X LTS](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

- Initialize project structure

    ```shell
    $ npm init @vitejs/app fiowebviewer-frontend -- --template vue
    ```

- Add development dependencies

    ```shell
    $ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    ```

- Create configuration for tailwind

    ```shell
    $ npx tailwindcss init -p
    ```

- Enable tree-shaking to remove unused styles

    ```js
    // tailwind.config.js
    module.exports = {
    ->  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
        darkMode: false, // or 'media' or 'class'
        theme: {
            extend: {},
        },
        variants: {
            extend: {},
        },
        plugins: [],
    }
    ```

- Include Tailwind in your CSS

    ```css
    /* ./src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    ```js
    // src/main.js
    import { createApp } from 'vue'
    import App from './App.vue'
    import './index.css'

    createApp(App).mount('#app')
    ```

## Sources

- [Vite | Installation](https://vitejs.dev/guide/)
- [Tailwindcss | Installation with Vite and Vue](https://tailwindcss.com/docs/guides/vue-3-vite)
