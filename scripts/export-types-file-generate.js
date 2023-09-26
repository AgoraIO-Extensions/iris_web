const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const generateCodePath = '/generate';

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('-')) {
    args.splice(args.indexOf(args[i]), 1);
    i--;
  }
}

if (args.length < 1 || !args[0].startsWith('output-path=')) {
  console.log('Usage: node export-file-generate.ts output-path=');
  process.exit(1);
}

const outputPath = args[0].substring(12);
console.log(outputPath);

const typesDir = path.join(outputPath, '..', generateCodePath);
console.log(typesDir);
fs.readdir(typesDir, (err, files) => {
  files = files.map((file) => {
    file = file.replace('.ts', '');
    return `export * from '.${generateCodePath}/${file}';`;
  });
  files = files.join('\n') + '\n';
  fs.writeFile(outputPath, files, (err) => {});
});
