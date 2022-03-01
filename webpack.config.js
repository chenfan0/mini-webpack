import path from "path";

function jsonLoader(source) {
  return `export default ${JSON.stringify(source)}`;
}

export default {
  entry: path.resolve("./src/", "index.js"),
  output: {
    path: path.resolve("./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: jsonLoader,
      },
    ],
  },
};
