const fs = require('fs');
const path = require('path');
const execa = require('execa');
const package = require('../package.json');

const buildLib = [
  {
    title: 'remove lib folder',
    task: () => execa('rm', ['-rf', 'lib'])
  },
  {
  	title: 'create lib version',
  	task: () => execa('npx', ['tsc'])
  },
  {
  	title: 'minify lib',
  	task: () => execa('npx', ['babel', 'lib', '--out-dir', './lib'])
  },
]

const buildEs = [
  {
    title: 'remove es folder',
    task: () => execa('rm', ['-rf', 'es'])
  },
  {
  	title: 'create es version',
  	task: () => execa('npx', ['tsc', '-build', './tsconfig.es.json'])
  },
  {
  	title: 'minify es',
  	task: () => execa('npx', ['babel', 'es', '--out-dir', './es'])
  },
]

const buildAllTasks = [
  ...buildLib,
  ...buildEs
];

const versionUpdateTasks = [
  {
    title: 'package version update',
    task: () => {
      package.version = package.version.split('.').map((e, i) => i === 2 ? `${parseInt(e, 10) + 1}` : e).join('.');
      fs.writeFileSync(
        path.resolve(__dirname, '../package.json'),
        new Uint8Array(Buffer.from(JSON.stringify(package, null, 2)))
      );
    },
  },
  {
    title: '[Git] add package.json',
    task: () => execa('git', ['add', 'package.json'])
  },
  {
    title: '[Git] Commits next package version',
    task: () => execa('git', ['commit', '-m', `Commits next package version: ${package.version}`])
  },
  {
    title: '[Git] Push',
    task: () => execa('git', ['push'])
  },
]

module.exports = {
  buildAllTasks,
  versionUpdateTasks,
}