# Vue 3 + TypeScript + Vite

A simple example of using TypeScript and Vue3 to make a small component for a 2D point.
We use also SVG to show the point vector dynamically. 

![Screenshot of the 2D Point Editor](https://raw.githubusercontent.com/lao-tseu-is-alive/vue3-ts/main/images/cgil_vue3_ts_point_edit_example.png)

## Project initial setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## How to initiate a blank vue3 project with typscript and vitejs

      npm create vite@latest vue3-ts --template vue-ts
