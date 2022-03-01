(function (map) {
  function require(id) {
    const [fn, mapping] = map[id];
    const exports = {};
    const module = {
      exports,
    };

    function localRequire(path) {
      const id = mapping[path];
      return require(id);
    }

    fn(localRequire, module, exports);
    return module.exports;
  }
  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _foo = require("./foo.js");

      console.log("main");
      (0, _foo.foo)();
    },
    {
      "./foo.js": 2,
    },
  ],

  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.foo = foo;

      function foo() {
        console.log("foo");
      }
    },
    [],
  ],
});
