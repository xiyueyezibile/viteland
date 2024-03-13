"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../package.json
var require_package = __commonJS({
  "../../package.json"(exports, module) {
    module.exports = {
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
var _cac = require('cac');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// createServer.ts
var _vite = require('vite');

// plugins/pluginIndexHtml.ts
var _promises = require('fs/promises');
var _utils = require('@viteland/utils');
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
              src: `/@fs/${_utils.CLIENT_ENTRY_PATH}`
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
          let html = await _promises.readFile.call(void 0, _utils.DEFAULT_HTML_PATH, "utf-8");
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
  return _vite.createServer.call(void 0, {
    plugins: [pluginIndexHtml()],
    root
  });
}

// ssr/build.ts

var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);


// ssr/renderPage.ts
var _fsextra = require('fs-extra'); var fs = _interopRequireWildcard(_fsextra);

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
    <script type="module" src="/${_optionalChain([clientChunk, 'optionalAccess', _ => _.fileName])}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(_path.join.call(void 0, root, "build"));
  await fs.writeFile(_path.join.call(void 0, root, "build/index.html"), html);
  await fs.remove(_path.join.call(void 0, root, ".temp"));
}

// ssr/build.ts

async function build(root = process.cwd()) {
  const [clientBundle, serverBundle] = await bundle(root);
  const { render } = await Promise.resolve().then(() => _interopRequireWildcard(require(_path.join.call(void 0, _utils.PACKAGE_ROOT, "packages/view/.temp/ssr-entry.cjs"))));
  await renderPage(render, root, clientBundle);
}
async function bundle(root) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    // 自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [_pluginreact2.default.call(void 0, )],
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? _utils.SERVER_ENTRY_PATH : _utils.CLIENT_ENTRY_PATH,
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
      _vite.build.call(void 0, resolveViteConfig(false)),
      // server build
      _vite.build.call(void 0, resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}

// index.ts

var version = require_package().version;
var cli = _cac.cac.call(void 0, "island").version(version).help();
cli.command("[root]", "start dev server").alias("dev").action(async (root) => {
  const serverRoot = root ? _path2.default.resolve(__dirname, "../../../" + root) : process.cwd();
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
  const serverRoot = root ? _path2.default.resolve(__dirname, "../../../" + root) : _path2.default.join(_utils.PACKAGE_ROOT, "packages/view");
  try {
    await build(serverRoot);
  } catch (e) {
    console.log(serverRoot);
    console.log(e);
  }
});
cli.parse();
//# sourceMappingURL=index.js.map