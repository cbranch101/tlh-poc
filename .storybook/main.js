module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "../src/stories/theme-builder/register.js",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
};
