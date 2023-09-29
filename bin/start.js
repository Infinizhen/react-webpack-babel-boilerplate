#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const https = require("https");
const { exec } = require("child_process"); // Corregido aquí

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

    // Create folder and initialize npm
    await exec(`mkdir ${projectName} && cd ${projectName} && npm init -f`);

    const packageJSONPath = `${projectName}/package.json`;

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
    const copyPromises = filesToCopy.map((file) =>
      fs.copy(path.join(__dirname, `../${file}`), `${projectName}/${file}`)
    );
    await Promise.all(copyPromises);

    // Download and copy .gitignore
    const gitIgnore = await downloadFile(
      "https://raw.githubusercontent.com/infinizhen/react-webpack-babel-boilerplate/main/.gitignore"
    );
    await fs.writeFile(`${projectName}/.gitignore`, gitIgnore, {
      encoding: "utf-8",
    });

    console.log("Installing deps...");

    // Install dependencies
    const devDeps = getDeps(packageJson.devDependencies);
    const deps = getDeps(packageJson.dependencies);
    await exec(
      `cd ${projectName} && git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`
    );

    console.log("Deps installed");

    console.log("Copying additional files...");

    // Copy source files
    await fs.copy(path.join(__dirname, "../src"), `${projectName}/src`);

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
        res.setEncoding("utf-8");
        let body = "";
        res.on("data", (data) => (body += data));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

initializeProject();
