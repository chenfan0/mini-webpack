import fs from "fs";
import path from "path";

import ejs from "ejs";
import config from "../webpack.config.js";

export function build(graph) {
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
