import fs from "fs";
import path from "path";

const fixes = [
  ["src/app/(public)/[locale]/about/page.js", "/about"],
  ["src/app/(public)/[locale]/blogs/page.js", "/blogs"],
  ["src/app/(public)/[locale]/contact/page.js", "/contact"],
  ["src/app/(public)/[locale]/doctors/page.js", "/doctors"],
  ["src/app/(public)/[locale]/international-patients/page.js", "/international-patients"],
  ["src/app/(public)/[locale]/partner-with-us/page.js", "/partner-with-us"],
  ["src/app/(public)/[locale]/services/ai-solutions/page.js", "/services/ai-solutions"],
  ["src/app/(public)/[locale]/tourism-leisure/page.js", "/tourism-leisure"],
  ["src/app/(public)/[locale]/treatments/page.js", "/treatments"],
  ["src/app/(public)/[locale]/why-india/page.js", "/why-india"],
];

for (const [file, p] of fixes) {
  let c = fs.readFileSync(file, "utf8");
  if (!c.includes("alternateLanguages")) {
    c = c.replace(
      /import \{ siteUrl \}/,
      "import { siteUrl, alternateLanguages }"
    );
  }
  c = c.replace(
    /languages: \{[\s\S]*?\},(\s*\},)/,
    `languages: alternateLanguages("${p}"),$1`
  );
  fs.writeFileSync(file, c);
  console.log("ok", file);
}
