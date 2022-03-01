import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import ejs from "ejs";
import { transformFromAst } from "babel-core";
import config from "../webpack.config.js";

let id = 0;

function createAsset(filePath) {
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

// 创建依赖图
function createGraph() {
  const entry = config.entry || "./src/main.js";
  const mainAsset = createAsset(entry);

  const queue = [mainAsset];
  const graph = [mainAsset];
  const map = new Map([[entry, mainAsset]]);

  while (queue.length > 0) {
    const asset = queue.shift();

    asset.deps.forEach((relativePath) => {
      const assetPath = path.resolve("./src", relativePath);

      // 处理循环依赖
      if (!map.has(assetPath)) {
        const childAsset = createAsset(assetPath);
        asset.mapping[relativePath] = childAsset.id;
        map.set(assetPath, childAsset);
        graph.push(childAsset);
        queue.push(childAsset);
      } else {
        asset.mapping[relativePath] = map.get(assetPath).id;
      }
    });
  }

  return graph;
}
const graph = createGraph();

function build(graph) {
  // 读取模板
  const template = fs.readFileSync("./lib/template.ejs", { encoding: "utf-8" });
  // 获取ejs所需数据
  const data = graph.map((asset) => {
    const { id, code, mapping } = asset;
    return {
      id,
      code,
      mapping,
    };
  });
  // 生成代码
  const code = ejs.render(template, { data });
  // 解析生成目录文件夹路径
  const { dir } = path.parse(config.output);
  // 先删除目录
  fs.rmSync(dir, {
    recursive: true,
  });
  // 创建目录
  fs.mkdirSync(dir);

  fs.writeFileSync(config.output, code);
}
build(graph);
