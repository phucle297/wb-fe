/**
 * REQUIRE ts-node or esbuild-runner
 * RUN
 * mkdir src/apis
 * cd to src/redux/api-slices
 * npx @rtk-query/codegen-openapi wb-api-config.ts
 * TO REGENERATE API SLICES
 */

import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "http://api.com/api/v1/docs-json/",
  apiFile: "./wb-api.ts",
  apiImport: "wbApi",
  tag: true,
  outputFiles: {
    "../../apis/wb.ts": {
      filterEndpoints: [/wb/i],
    },
  },
  exportName: "wbApi",
  hooks: true,
};

export default config;
