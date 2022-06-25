import type { Config } from "@jest/types";
const { defaults } = require("jest-config");

// Objet synchrone
const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
};
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};




export default config;
