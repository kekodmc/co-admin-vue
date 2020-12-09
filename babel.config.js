module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
      ["@babel/preset-env", {
          useBuiltIns: "usage", // or "entry"
          corejs: 3,
      }]
  ]
}
