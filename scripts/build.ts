import { yaml, fs } from '@hydrooj/utils';

const english = yaml.load(fs.readFileSync('en.yaml', 'utf8'));
const chinese = yaml.load(fs.readFileSync('zh.yaml', 'utf8'));
delete english.__id;
delete chinese.__id;
delete english.__langname;
delete chinese.__langname;
const keys = Object.keys(chinese);
for (const key of keys) {
    if (english[key] === undefined) {
        english[key] = key;
    }
}
const entries = Object.fromEntries(Object.entries(english).sort((a, b) => a[0].localeCompare(b[0])));
fs.writeFileSync('en.yaml', yaml.dump(entries));

fs.ensureDirSync('dist');
const files = fs.readdirSync('locales');
for (const file of files) {
    if (!file.endsWith('.yaml')) continue;
    const content = fs.readFileSync(`locales/${file}`, 'utf8');
    const data = yaml.load(content);
    data.__id = file.split('.')[0];
    fs.writeFileSync(`dist/${file}`, JSON.stringify(data));
}