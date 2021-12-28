const { compile } = require('nexe');

console.log('Compiling binaries...');
compile({
  input: 'nccBuild/index.js',
  output: `nexeBuild/gis_server.exe`,
  resources: ['nccBuild/**/*'],
  targets: ['windows-x64-12.16.3'],
})
  .then(() => {
    console.log('Finished compiling binaries');
  })
  .catch(error => {
    console.error(error);
  });
