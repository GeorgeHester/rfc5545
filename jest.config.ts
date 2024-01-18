import type { JestConfigWithTsJest } from "ts-jest";

const configuration: JestConfigWithTsJest = {
    displayName: {
        name: "RFC5545",
        color: "cyan",
    },
    errorOnDeprecated: true,
    maxConcurrency: 10,
    // maxWorkers
    reporters: ["default"],
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node", "d.ts"]
};

export default configuration;