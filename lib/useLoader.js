import config from "../webpack.config.js";

export function useLoader(source, filePath) {
  // 获取rules
  const rules = config.module.rules;

  rules.forEach(async ({ test, use }) => {
    if (test.test(filePath)) {
      if (Array.isArray(use)) {
        use.reverse().forEach((loader) => {
          source = loader(source);
        });
      } else {
        source = use(source);
      }
    }
  });
  return source;
}
