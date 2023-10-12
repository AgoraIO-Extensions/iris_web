# iris_web

cross platform support in web

## Install

npm install -g pnpm

## QuickStart

pnpm start

this command can watch files and recompile whenever they change.

## Build

pnpm build

The output file will be placed in `packages/rtc/dist`

## How to install iris_web to your cross platform

prepare a [Live Server](https://github.com/ritwickdey/vscode-live-server-plus-plus)

add the `iris-web-rtc_x.x.x-x.x.js` to your html `srcipt`, e.g.,

```html
<script
  src="http://127.0.0.1:5500/lib-iris-web.js"
  type="application/javascript"
></script>
```
