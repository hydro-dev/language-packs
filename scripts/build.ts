import { yaml, fs } from '@hydrooj/utils';

fs.ensureDirSync('dist');
const files = fs.readdirSync('locales');
for (const file of files) {
    if (!file.endsWith('.yaml')) continue;
    const content = fs.readFileSync(`locales/${file}`, 'utf8');
    const data = yaml.load(content);
    data.__id = file.split('.')[0];
    fs.writeFileSync(`dist/${file}`, JSON.stringify(data));
}