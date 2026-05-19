import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === "page.js") acc.push(p);
  }
  return acc;
}

for (const file of walk(path.join(process.cwd(), "src"))) {
  let c = fs.readFileSync(file, "utf8");
  const orig = c;
  c = c.replace(/"en": "\$\{siteUrl\("en",/g, '"en": `${siteUrl("en",');
  c = c.replace(/\)\}",(\s*\n\s*"fr":)/g, ")}`,$1");
  if (c !== orig) {
    fs.writeFileSync(file, c);
    console.log("fixed", file);
  }
}
