var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../package.json
var require_package = __commonJS({
  "../../package.json"(exports2, module2) {
    module2.exports = {
      name: "viteland",
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "@types/node": "^20.11.26",
        "@typescript-eslint/eslint-plugin": "^7.2.0",
        "@typescript-eslint/parser": "^7.2.0",
        "babel-eslint": "^10.1.0",
        eslint: "^8.57.0",
        "eslint-config-prettier": "^9.1.0",
        "eslint-plugin-import": "^2.29.1",
        "eslint-plugin-prettier": "^5.1.3",
        "eslint-plugin-react": "^7.34.0",
        lerna: "^8.1.2",
        prettier: "^3.2.5",
        typescript: "^5.4.2"
      }
    };
  }
});

// index.ts
var import_cac = require("cac");
var import_path3 = __toESM(require("path"));

// createServer.ts
var import_vite = require("vite");

// plugins/pluginIndexHtml.ts
var import_promises = require("fs/promises");
var import_utils = require("@viteland/utils");
function pluginIndexHtml() {
  return {
    name: "viteland-html",
    apply: "serve",
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              // vite约定 @fs 标识后面为一个绝对路径
              src: `/@fs/${import_utils.CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      };
    },
    // 开发服务器钩子
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await (0, import_promises.readFile)(import_utils.DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(req.url, html, req.originalUrl);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// createServer.ts
async function createServer(root = process.cwd()) {
  return (0, import_vite.createServer)({
    plugins: [pluginIndexHtml()],
    root
  });
}

// ssr/build.ts
var import_utils2 = require("@viteland/utils");
var import_plugin_react = __toESM(require("@vitejs/plugin-react"));
var import_vite2 = require("vite");

// ssr/renderPage.ts
var fs = __toESM(require("fs-extra"));
var import_path = require("path");
async function renderPage(render, root, clientBundle) {
  const clientChunk = clientBundle.output.find((chunk) => chunk.type === "chunk" && chunk.isEntry);
  console.log(`Rendering page in server side...`);
  const appHtml = render();
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir((0, import_path.join)(root, "build"));
  await fs.writeFile((0, import_path.join)(root, "build/index.html"), html);
  await fs.remove((0, import_path.join)(root, ".temp"));
}

// ssr/build.ts
var import_path2 = require("path");
async function build(root = process.cwd()) {
  const [clientBundle, serverBundle] = await bundle(root);
  const { render } = require((0, import_path2.join)(import_utils2.PACKAGE_ROOT, "packages/view/.temp/ssr-entry.cjs"));
  await renderPage(render, root, clientBundle);
}
async function bundle(root) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    // 自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [(0, import_plugin_react.default)()],
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? import_utils2.SERVER_ENTRY_PATH : import_utils2.CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  console.log(`Building client + server bundles...`);
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      (0, import_vite2.build)(resolveViteConfig(false)),
      // server build
      (0, import_vite2.build)(resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}

// index.ts
var import_utils3 = require("@viteland/utils");
var version = require_package().version;
var cli = (0, import_cac.cac)("island").version(version).help();
cli.command("[root]", "start dev server").alias("dev").action(async (root) => {
  const serverRoot = root ? import_path3.default.resolve(__dirname, "../../../" + root) : process.cwd();
  try {
    const server = await createServer(serverRoot);
    await server.listen();
    server.printUrls();
  } catch (error) {
    console.log(serverRoot);
    console.log(error);
  }
});
cli.command("build [root]", "build for production").action(async (root) => {
  const serverRoot = root ? import_path3.default.resolve(__dirname, "../../../" + root) : import_path3.default.join(import_utils3.PACKAGE_ROOT, "packages/view");
  console.log(serverRoot);
  try {
    await build(serverRoot);
  } catch (e) {
    console.log(serverRoot);
    console.log(e);
  }
});
cli.parse();
//# sourceMappingURL=index.js.map