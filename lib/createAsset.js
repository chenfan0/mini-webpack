import fs from "fs";

import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAst } from "babel-core";

let id = 0;

export function createAsset(filePath) {
  // 1.获取文件内容
  const source = fs.readFileSync(filePath, {
    encoding: "utf-8",
  });

  // 2.获取依赖关系
  // 2.1生成ast
  const ast = parser.parse(source, {
    sourceType: "module",
  });
  // 2.2获取依赖
  const deps = [];
  // 获取所有import
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value);
    },
  });
  // 将esm代码转换成cjs
  const { code } = transformFromAst(ast, null, {
    // 需要安装babel-preset-env
    presets: ["env"],
  });

  return {
    filePath,
    code,
    deps,
    id: id++,
    mapping: {},
  };
}
