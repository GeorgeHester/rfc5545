import * as fs from "fs";
import * as path from "path";
import { RFC5545 } from "./rfc5545.js";

function main(): void
{
    let input: string = fs.readFileSync(path.resolve("test", "input.txt"), { encoding: "utf8" });

    RFC5545.parse(input);
};

main();