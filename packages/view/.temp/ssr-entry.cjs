"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const server = require("react-dom/server");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespaceDefault(React);
const DataContext = React.createContext({});
const usePageData = () => {
  return React.useContext(DataContext);
};
function App() {
  const pageData = usePageData();
  const { pageType } = pageData;
  console.log(pageData);
  const getContent = () => {
    if (pageType === "home") {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "Home 页面" });
    } else if (pageType === "doc") {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "正文页面" });
    } else {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "404 页面" });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { children: getContent() });
}
/**
 * @remix-run/router v1.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ React__namespace.createContext(null);
if (process.env.NODE_ENV !== "production") {
  DataRouterContext.displayName = "DataRouter";
}
const DataRouterStateContext = /* @__PURE__ */ React__namespace.createContext(null);
if (process.env.NODE_ENV !== "production") {
  DataRouterStateContext.displayName = "DataRouterState";
}
const AwaitContext = /* @__PURE__ */ React__namespace.createContext(null);
if (process.env.NODE_ENV !== "production") {
  AwaitContext.displayName = "Await";
}
const NavigationContext = /* @__PURE__ */ React__namespace.createContext(null);
if (process.env.NODE_ENV !== "production") {
  NavigationContext.displayName = "Navigation";
}
const LocationContext = /* @__PURE__ */ React__namespace.createContext(null);
if (process.env.NODE_ENV !== "production") {
  LocationContext.displayName = "Location";
}
const RouteContext = /* @__PURE__ */ React__namespace.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (process.env.NODE_ENV !== "production") {
  RouteContext.displayName = "Route";
}
const RouteErrorContext = /* @__PURE__ */ React__namespace.createContext(null);
if (process.env.NODE_ENV !== "production") {
  RouteErrorContext.displayName = "RouteError";
}
function useInRouterContext() {
  return React__namespace.useContext(LocationContext) != null;
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = React__namespace.useMemo(() => ({
    basename,
    navigator,
    static: staticProp,
    future: _extends({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = React__namespace.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  process.env.NODE_ENV !== "production" ? warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.") : void 0;
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ React__namespace.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React__namespace.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
new Promise(() => {
});
function StaticRouter({
  basename,
  children,
  location: locationProp = "/",
  future
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = Action.Pop;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state || null,
    key: locationProp.key || "default"
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ React__namespace.createElement(Router, {
    basename,
    children,
    location,
    navigationType: action,
    navigator: staticNavigator,
    future,
    static: true
  });
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
    },
    forward() {
      throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const frontmatter$3 = void 0;
const toc$3 = [];
function _createMdxContent$3(props) {
  const _components = {
    a: "a",
    h1: "h1",
    p: "p",
    ...props.components
  };
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [jsxRuntime.jsxs(_components.h1, {
      id: "a",
      children: [jsxRuntime.jsx(_components.a, {
        className: "header-anchor",
        href: "#a",
        children: "#"
      }), "a"]
    }), "\n", jsxRuntime.jsxs(_components.p, {
      children: ["literals ", jsxRuntime.jsx(_components.a, {
        href: "http://www.example.com",
        children: "www.example.com"
      }), ", ", jsxRuntime.jsx(_components.a, {
        href: "https://example.com",
        children: "https://example.com"
      }), ", and ", jsxRuntime.jsx(_components.a, {
        href: "mailto:contact@example.com",
        children: "contact@example.com"
      }), "."]
    })]
  });
}
function MDXContent$3(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntime.jsx(MDXLayout, {
    ...props,
    children: jsxRuntime.jsx(_createMdxContent$3, {
      ...props
    })
  }) : _createMdxContent$3(props);
}
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MDXContent$3,
  frontmatter: frontmatter$3,
  toc: toc$3
}, Symbol.toStringTag, { value: "Module" }));
const frontmatter$2 = void 0;
const toc$2 = [];
function _createMdxContent$2(props) {
  const _components = {
    a: "a",
    h1: "h1",
    ...props.components
  };
  return jsxRuntime.jsxs(_components.h1, {
    id: "b",
    children: [jsxRuntime.jsx(_components.a, {
      className: "header-anchor",
      href: "#b",
      children: "#"
    }), "b"]
  });
}
function MDXContent$2(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntime.jsx(MDXLayout, {
    ...props,
    children: jsxRuntime.jsx(_createMdxContent$2, {
      ...props
    })
  }) : _createMdxContent$2(props);
}
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MDXContent$2,
  frontmatter: frontmatter$2,
  toc: toc$2
}, Symbol.toStringTag, { value: "Module" }));
const frontmatter$1 = {
  "title": "viteland"
};
const toc$1 = [];
function _createMdxContent$1(props) {
  const _components = {
    a: "a",
    h1: "h1",
    ...props.components
  };
  return jsxRuntime.jsxs(_components.h1, {
    id: "guide",
    children: [jsxRuntime.jsx(_components.a, {
      className: "header-anchor",
      href: "#guide",
      children: "#"
    }), "guide"]
  });
}
function MDXContent$1(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntime.jsx(MDXLayout, {
    ...props,
    children: jsxRuntime.jsx(_createMdxContent$1, {
      ...props
    })
  }) : _createMdxContent$1(props);
}
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MDXContent$1,
  frontmatter: frontmatter$1,
  toc: toc$1
}, Symbol.toStringTag, { value: "Module" }));
const frontmatter = {
  "title": "viteland"
};
const toc = [];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    ...props.components
  };
  return jsxRuntime.jsxs(_components.h1, {
    id: "guide",
    children: [jsxRuntime.jsx(_components.a, {
      className: "header-anchor",
      href: "#guide",
      children: "#"
    }), "guide"]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntime.jsx(MDXLayout, {
    ...props,
    children: jsxRuntime.jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MDXContent,
  frontmatter,
  toc
}, Symbol.toStringTag, { value: "Module" }));
const routes$1 = [
  { path: "/guide/a/", element: MDXContent$3, preload: () => Promise.resolve().then(() => index$3) },
  { path: "/guide/b/", element: MDXContent$2, preload: () => Promise.resolve().then(() => index$2) },
  { path: "/guide/", element: MDXContent$1, preload: () => Promise.resolve().then(() => index$1) },
  { path: "/", element: MDXContent, preload: () => Promise.resolve().then(() => index) }
];
const routes = routes$1.map((route) => {
  const reactElement = React.createElement(route.element);
  return { element: reactElement, ...route };
});
function render(pagePath) {
  return server.renderToString(
    /* @__PURE__ */ jsxRuntime.jsx(StaticRouter, { location: pagePath, children: /* @__PURE__ */ jsxRuntime.jsx(App, {}) })
  );
}
exports.render = render;
exports.routes = routes;
