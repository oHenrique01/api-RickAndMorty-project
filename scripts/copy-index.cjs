const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(path.join(projectRoot, "index.html"), path.join(distDir, "index.html"));
