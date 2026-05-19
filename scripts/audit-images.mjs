import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "..", "public");

function checkPaths(label, paths) {
  const missing = [];
  const ok = [];
  for (const p of paths) {
    if (!p || p.startsWith("http")) {
      ok.push(p);
      continue;
    }
    const rel = p.replace(/^\//, "");
    const fp = path.join(publicDir, rel);
    if (fs.existsSync(fp)) ok.push(p);
    else missing.push(p);
  }
  console.log(`\n=== ${label} ===`);
  console.log(`OK: ${ok.length}, Missing: ${missing.length}`);
  if (missing.length) {
    console.log("Missing:");
    [...new Set(missing)].forEach((m) => console.log("  ", m));
  }
  return missing;
}

// detailedHospitals.json
const hospitals = JSON.parse(
  fs.readFileSync(path.join(root, "..", "src/data/detailedHospitals.json"), "utf8")
);
const hospitalImgs = [];
for (const country of hospitals.countries || []) {
  for (const city of country.cities || []) {
    for (const h of city.hospitals || []) {
      for (const img of h.images || []) hospitalImgs.push(img);
    }
  }
}
checkPaths("detailedHospitals.json images", hospitalImgs);

// doctors.json
const doctors = JSON.parse(
  fs.readFileSync(path.join(root, "..", "src/data/doctors.json"), "utf8")
);
const doctorImgs = doctors.map((d) => d.image).filter(Boolean);
checkPaths("doctors.json images", doctorImgs);

// hospitalsData.js - extract image paths via regex
const hospitalsDataSrc = fs.readFileSync(
  path.join(root, "..", "src/data/hospitalsData.js"),
  "utf8"
);
const dataPaths = [...hospitalsDataSrc.matchAll(/["'](\/[^"']+\.(?:jpg|jpeg|png|webp|avif|gif))["']/gi)].map(
  (m) => m[1]
);
checkPaths("hospitalsData.js image paths", dataPaths);
