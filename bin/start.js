#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const https = require("https");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const packageJson = require("../package.json");

const scripts = `"start": "webpack-dev-server --mode=development --open --hot",
"build": "webpack --mode=production"`;

async function initializeProject() {
  try {
    const projectName = process.argv[2];
    if (!projectName) {
      console.error("Error: No project name provided.");
      process.exit(1);
    }

    console.log(
      `Initializing project ${packageJson.version}, please wait a sec...`
    );

    // Create project folder
    await fs.ensureDir(projectName);

    // Change to project directory and initialize npm
    process.chdir(projectName);
    await exec(`npm init -f`);

    const packageJSONPath = `package.json`;

    // Read and update package.json scripts
    const data = await fs.readFile(packageJSONPath, "utf8");
    const updatedData = data
      .replace(
        '"test": "echo \\"Error: no test specified\\" && exit 1"',
        scripts
      )
      .replace('"keywords": [],\n', "");
    await fs.writeFile(packageJSONPath, updatedData);

    console.log("npm init -- done\n");

    // Copy configuration files
    const filesToCopy = ["webpack.config.js", ".babelrc", ".browserslistrc"];
    for (const file of filesToCopy) {
      await fs.copy(path.join(__dirname, `../${file}`), file);
    }

    // Download and copy .gitignore
    const gitIgnore = await downloadFile(
      "https://raw.githubusercontent.com/infinizhen/react-webpack-babel-boilerplate/main/.gitignore"
    );
    await fs.writeFile(`.gitignore`, gitIgnore, { encoding: "utf-8" });

    console.log("Installing deps...");

    // Install dependencies
    const devDeps = getDeps(packageJson.devDependencies);
    const deps = getDeps(packageJson.dependencies);
    await exec(
      `git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`
    );

    console.log("Deps installed");

    console.log("Copying additional files...");

    // Copy source files
    await fs.copy(path.join(__dirname, "../src"), `src`);

    console.log(
      `All done!\n\nYour project is now ready\n\nUse the below command to run the app.\n\ncd ${projectName}\nnpm start`
    );
  } catch (error) {
    console.error(`An error has occurred: ${error}`);
  }
}

function getDeps(deps) {
  return Object.entries(deps)
    .map((dep) => `${dep[0]}@${dep[1]}`)
    .join(" ");
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => (body += data));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

initializeProject();
