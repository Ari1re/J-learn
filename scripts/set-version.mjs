// Sets the app version in tauri.conf.json, package.json and Cargo.toml.
// Usage: node scripts/set-version.mjs 1.0.42
import { readFileSync, writeFileSync } from 'node:fs';
const v = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(v || '')) { console.error('Give a version like 1.0.42'); process.exit(1); }
const json = (p, f) => { const o = JSON.parse(readFileSync(p, 'utf8')); f(o); writeFileSync(p, JSON.stringify(o, null, 2) + '\n'); };
json('src-tauri/tauri.conf.json', o => { o.version = v; });
json('package.json', o => { o.version = v; });
const cargo = 'src-tauri/Cargo.toml';
writeFileSync(cargo, readFileSync(cargo, 'utf8').replace(/^version = ".*"$/m, `version = "${v}"`));
console.log('Version set to', v);
