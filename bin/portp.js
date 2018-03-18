#! /usr/bin/env node

const portp = require("../src/portp");

const portLocal = (process.argv.length >= 2 && parseInt(process.argv[2])) || 3000;
const portPublic = (process.argv.length >= 3 && parseInt(process.argv[3])) || 3000;

portp(portLocal, portPublic, true);
