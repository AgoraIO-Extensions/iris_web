const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');

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

const fileContents = fs.readFileSync(
  __dirname + '/config/types_configs.yaml',
  'utf8'
);

const data = yaml.load(fileContents);

const typesDir = path.join(outputPath, '..', generateCodePath);
console.log(typesDir);

const typesPackageJsonPath = path.join(outputPath, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(typesPackageJsonPath, 'utf8'));

packageJson['nativeSdkVersion'] = data['version'];

fs.writeFileSync(
  typesPackageJsonPath,
  JSON.stringify(packageJson, null, 2) + '\n'
);

fs.readdir(typesDir, (err, files) => {
  files = files.map((file) => {
    file = file.replace('.ts', '');
    return `export * from '.${generateCodePath}/${file}';`;
  });
  files.push(`export const NATIVE_RTC_VERSION = '${data['version']}';`);
  files = files.join('\n') + '\n';
  fs.writeFile(outputPath, files, (err) => {});
});
