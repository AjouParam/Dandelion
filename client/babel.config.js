module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./components",
            "@contexts": "./contexts",
            "@navigations": "./navigations",
            "@screens": "./screens",
            "@utils": "./utils",
          },
        },
      ],
    ],
  };
};
