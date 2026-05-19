import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(js|jsx)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

for (const file of walk(path.join(process.cwd(), "src"))) {
  let c = fs.readFileSync(file, "utf8");
  const orig = c;
  // Stray `}` from broken template literal conversion after localePath(...)
  c = c.replace(/localePath\(([^)]*(?:`[^`]*`[^)]*)*)\)\}/g, "localePath($1)");
  c = c.replace(/router\.push\(\$\{localePath/g, "router.push(localePath");
  if (c !== orig) {
    fs.writeFileSync(file, c);
    console.log("fixed", file);
  }
}
