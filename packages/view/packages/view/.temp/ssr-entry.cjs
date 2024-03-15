"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const server = require("react-dom/server");
const siteData = { "title": "viteland.js", "description": "SSG Framework", "themeConfig": {}, "vite": {} };
function App() {
  const [count, setCount] = react.useState(0);
  console.log(siteData);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx("h1", { children: "This is Layout Component" }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      count,
      /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: () => setCount(count + 1), children: "Add Count" })
    ] })
  ] });
}
function render() {
  return server.renderToString(/* @__PURE__ */ jsxRuntime.jsx(App, {}));
}
exports.render = render;
