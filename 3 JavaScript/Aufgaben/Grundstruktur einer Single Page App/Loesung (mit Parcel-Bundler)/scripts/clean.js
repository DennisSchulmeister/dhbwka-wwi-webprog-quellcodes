"use strict";

const path = require("path");
const shell = require("shelljs");

const build_dir = path.normalize(path.join(__dirname, "..", "dist"));
shell.rm("-rf", path.join(build_dir, "*"));
