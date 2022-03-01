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
  
  "0": [
    function (require, module, exports) {
      "use strict";

var _foo = require("./foo.js");

console.log("main");
(0, _foo.foo)(); 
    }, 
    {"./foo.js":1}
  ],
  
  "1": [
    function (require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

function foo() {
  console.log("foo");
}

(0, _bar.bar)(); 
    }, 
    {"./bar.js":2}
  ],
  
  "2": [
    function (require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

var _foo = require("./foo.js");

function bar() {
  console.log("bar");
}

(0, _foo.foo)();
(0, _foo.foo)(); 
    }, 
    {"./foo.js":1}
  ],
  
});
