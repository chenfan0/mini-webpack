import path from "path";

import { createAsset } from "./createAsset.js";
import config from "../webpack.config.js";

export function createGraph() {
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
