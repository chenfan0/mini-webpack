(function (map) {
  function require(id, importMap = new Map()) {
    if (importMap.has(id)) {
      return importMap.get(id);
    }
    const [fn, mapping] = map[id];
    const exports = {};
    const module = {
      exports,
    };

    function localRequire(path) {
      const id = mapping[path];
      return require(id, importMap);
    }
    importMap.set(id, module.exports);
    fn(localRequire, module, exports);
    return module.exports;
  }
  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _foo = require("./foo.js");

      var _user = require("./user.json");

      var _user2 = _interopRequireDefault(_user);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_user2.default);
      console.log("main");
    },
    { "./foo.js": 1, "./user.json": 2 },
  ],

  1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.foo = foo;

      var _bar = require("./bar.js");

      function foo() {
        console.log("foo");
      }

      (0, _bar.bar)();
    },
    { "./bar.js": 3 },
  ],

  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.default = '{\r\n  "user": "aaa"\r\n}\r\n';
    },
    {},
  ],

  3: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.bar = bar;

      var _foo = require("./foo.js");

      function bar() {
        console.log("bar");
      }

      (0, _foo.foo)();
      (0, _foo.foo)();
    },
    { "./foo.js": 1 },
  ],
});
