module.exports = (phase, { defaultConfig }) => {
  if ("sassOptions" in defaultConfig) {
    defaultConfig["sassOptions"] = {
      includePaths: ["./src"],
      prependData: `@import "~@/app/variables.module.scss"; 
                        @import "~@/styles/mixins.scss";`,
    };
  }
  defaultConfig["experimental"] = {
    appDir: true,
    serverActions: true,
  };

  return defaultConfig;
};
