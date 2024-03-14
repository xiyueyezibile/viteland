"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkY2F7D3TJjs = require('./chunk-Y2F7D3TJ.js');

// ../../package.json
var require_package = _chunkY2F7D3TJjs.__commonJS.call(void 0, {
  "../../package.json"(exports, module) {
    module.exports = {
      name: "viteland",
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        lint: "eslint packages --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "lint:lint-staged": "lint-staged",
        prepare: "husky install"
      },
      "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
          "pnpm run lint --fix",
          "npx prettier --write"
        ],
        "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
          "npx prettier --write--parser json"
        ],
        "package.json": [
          "npx prettier --write"
        ],
        "*.{scss,less,styl,html}": [
          "npx prettier --write"
        ],
        "*.md": [
          "npx prettier --write"
        ]
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "@commitlint/cli": "^19.1.0",
        "@commitlint/config-conventional": "^19.1.0",
        "@types/node": "^20.11.26",
        "@typescript-eslint/eslint-plugin": "^7.2.0",
        "@typescript-eslint/parser": "^7.2.0",
        "babel-eslint": "^10.1.0",
        commitlint: "^19.1.0",
        eslint: "^8.57.0",
        "eslint-config-prettier": "^9.1.0",
        "eslint-plugin-import": "^2.29.1",
        "eslint-plugin-prettier": "^5.1.3",
        "eslint-plugin-react": "^7.34.0",
        husky: "^9.0.11",
        lerna: "^8.1.2",
        "lint-staged": "^15.2.2",
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

// config.ts

var _fsextra = require('fs-extra'); var fs2 = _interopRequireWildcard(_fsextra);

function getUserConfigPath(root) {
  try {
    const supportConfigFiles = ["config.ts", "config.js"];
    const configPath = supportConfigFiles.map((file) => _path.resolve.call(void 0, root, file)).find(fs2.default.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`Failed to load user config: ${e}`);
    throw e;
  }
}
async function resolveUserConfig(root, command, mode) {
  const configPath = getUserConfigPath(root);
  const result = await _vite.loadConfigFromFile.call(void 0, 
    {
      command,
      mode
    },
    configPath,
    root
  );
  if (result) {
    const { config: rawConfig = {} } = result;
    const userConfig = await (typeof rawConfig === "function" ? rawConfig() : rawConfig);
    return [configPath, userConfig];
  } else {
    return [configPath, {}];
  }
}
function resolveSiteData(userConfig) {
  return {
    title: userConfig.title || "viteland.js",
    description: userConfig.description || "SSG Framework",
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}
async function resolveConfig(root, command, mode) {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  const siteConfig = {
    root,
    configPath,
    siteData: resolveSiteData(userConfig)
  };
  return siteConfig;
}

// plugins/pluginConfig.ts

var SITE_DATA_ID = "viteland:site-data";
function pluginConfig(config, restartServer) {
  return {
    name: "viteland:config",
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return "\0" + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === "\0" + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    // 配置文件变动时重启开发服务器
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id) => customWatchedFiles.some((file) => id.includes(file));
      if (include(ctx.file.replace(/\//g, _path.sep))) {
        console.log(`
${_path.relative.call(void 0, config.root, ctx.file)} changed, restarting server...`);
        await restartServer();
      }
    }
  };
}

// createServer.ts
async function createServer(root = process.cwd(), restartServer) {
  const config = await resolveConfig(root, "serve", "development");
  console.log(config);
  return _vite.createServer.call(void 0, {
    plugins: [pluginIndexHtml(), pluginConfig(config, restartServer)],
    root
  });
}

// ssr/build.ts

var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);


// ssr/renderPage.ts


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
  await fs2.ensureDir(_path.join.call(void 0, root, "build"));
  await fs2.writeFile(_path.join.call(void 0, root, "build/index.html"), html);
  await fs2.remove(_path.join.call(void 0, root, ".temp"));
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
var cli = _cac.cac.call(void 0, "viteland").version(version).help();
cli.command("[root]", "start dev server").alias("dev").action(async (root) => {
  const serverRoot = root ? _path2.default.resolve(__dirname, "../../../" + root) : process.cwd();
  const create = async () => {
    try {
      const server = await createServer(serverRoot, async () => {
        await server.close();
        await create();
      });
      await server.listen();
      server.printUrls();
    } catch (error) {
      console.log(serverRoot);
      console.log(error);
    }
  };
  await create();
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