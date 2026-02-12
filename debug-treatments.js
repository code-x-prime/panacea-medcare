
const { treatmentsData, getTreatmentBySlug } = require('./src/data/treatmentsData.js');

const slug = "cardiac";
const treatment = getTreatmentBySlug(slug);

console.log(`Checking slug: ${slug}`);
console.log(`Found treatment:`, treatment ? treatment.id : "Not Found");

if (treatment) {
    console.log(`Namespace: ${treatment.namespace}`);
}

const allSlugs = Object.values(treatmentsData).map(t => t.slug);
console.log(`All slugs:`, allSlugs);
