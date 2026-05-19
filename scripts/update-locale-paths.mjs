import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "src");
const files = [];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(js|jsx)$/.test(ent.name)) files.push(p);
  }
}
walk(srcDir);

for (const file of files) {
  if (file.includes("lib\\locale\\routing.js") || file.includes("lib/locale/routing.js")) continue;
  if (file.includes("middleware.js")) continue;

  let c = fs.readFileSync(file, "utf8");
  const original = c;

  c = c.replace(
    /https:\/\/www\.panaceamedcare\.com\/\$\{locale\}(\/[^"'`]*)/g,
    (_, p) => `\${siteUrl(locale, \`${p}\`)}`
  );
  c = c.replace(
    /https:\/\/www\.panaceamedcare\.com\/en(\/[^"'`]*)/g,
    (_, p) => `\${siteUrl("en", \`${p}\`)}`
  );

  c = c.replace(/`\/\$\{locale\}([^`]*?)`/g, (m, rest) => {
    if (m.includes("siteUrl")) return m;
    const inner = rest || "";
    if (inner === "" || inner === "/") return "${localePath(locale, '/')}";
    return `\${localePath(locale, \`/${inner.replace(/^\//, "")}\`)}`;
  });

  c = c.replace(/`\/\$\{locale\}`/g, "${localePath(locale, '/')}");

  c = c.replace(/"\/"\s*\+\s*locale\s*\+\s*([a-zA-Z0-9_.()[\]'"]+)/g, "localePath(locale, $1)");
  c = c.replace(/"\/"\s*\+\s*locale\b/g, "localePath(locale, '/')");

  if (c === original) continue;

  const usesPath = c.includes("localePath");
  const usesSite = c.includes("siteUrl");
  if ((usesPath || usesSite) && !c.includes("@/lib/locale/routing")) {
    const parts = [];
    if (usesPath) parts.push("localePath");
    if (usesSite) parts.push("siteUrl");
    const imp = `import { ${parts.join(", ")} } from "@/lib/locale/routing";\n`;
    const idx = c.indexOf("\n");
    c = c.slice(0, idx + 1) + imp + c.slice(idx + 1);
  }

  fs.writeFileSync(file, c);
  console.log("updated", path.relative(process.cwd(), file));
}
