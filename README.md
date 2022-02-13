# REACT17-WEBPACK5-BABEL7 BOILERPLATE

This is a really simple and minimalistic React 17, Webpack 5.68 and Babel 7.17 boilerplate project.

By simple and minimalistic i mean **simple and minimalistic**.
It is just that. A simple project, with the most common dependencies (both prod and dev) for a minimal React project setup.

It doesn't include any test suites or CSS frameworks. It doesn't even include a router.

# Project goal

The goal is to save me (and maybe you) like 10 or 15 minutes setting up the things i will need to use on every new react project. Sometimes i don't need CSS, sometimes i don't test dumb things, sometimes a project doesn't even feature a single link.

So that's why is this simple. This is **my** bare minimum to start working on even the most trivial of projects.

# Usage

## Install with npm and execute with npx!

Install globally with npm:

`npm i @infinizhen/react-webpack-babel-boilerplate -g`

Then you can run the package a là CRA:

`npx infinizhen your-app`

or

`npx react-webpack-babel-boilerplate my-app`

## Clone the repo!

`git clone https://github.com/Infinizhen/react-webpack-babel-boilerplate.git`

# Project Structure

The project structure is just suited to my most common needs.
It is not important and obviously you don't need to follow that structure at all.

- All the code is stored in **/src**.

  > The entry point of the project is **/src/index.js**. This file renders a one-liner placeholder Component in that very file wich its only intention is to act as, well... a placeholder. It just renders a strings confiriming everything went okay when you run the app for the first time.

  > I usually write a layout component/s wich then will show other components, these are stored in **/src/layout/**.

  > Then i also usually diferentiate between "components" and "controls" even if they both are technically components, so i separate them in **/src/components/** and **/src/controls/** respectively.

- Webpack is configured to build a bundle.js in the **/public** folder, using **/src/index.html** as the template.

## package.json scripts

The most easy ones for webpack 5:

> `serve` runs `npm run webpack serve --mode development`

> `build` runs `npm run webpack --mode production`

# Configurations

## Webpack

It has the babel loader, and the style / css loader.
Even if this project comes with no css frameworks or files, this configuration is included for obvious reasons.

It also features html-webpack-plugin and mini-css-extract-plugin.

## Babel

This project uses a .babelrc file with @babel/preset-env and @babel/preset-react.

# Other features

## .browserslistrc

Babel will transpile to alive browsers with 0.25% market share or more.
