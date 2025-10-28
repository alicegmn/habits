const fs = require("fs");
const path = require("path");
const specs = require("./swagger.jsdoc.js");

// Folder for generated docs is docs/
const docsDir = path.join(__dirname, "docs");

// Create docs/ folder if it doesn't exist
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

/**
 * ✅ Guard: Check if the generated Swagger spec actually contains endpoints
 */
if (!specs.paths || Object.keys(specs.paths).length === 0) {
  console.warn(
    "⚠️  Warning: Swagger spec has no paths (no endpoints detected)."
  );
  console.warn(
    "💡  Check that your '@openapi' comments exist and that the 'apis' path in swagger.jsdoc.js' points to your files.\n"
  );
}

if (!specs.components || Object.keys(specs.components).length === 0) {
  console.warn("⚠️  Warning: Swagger spec has no components (schemas).\n");
}

// Write the static JSON file for Swagger UI
fs.writeFileSync(
  path.join(docsDir, "openapi.json"),
  JSON.stringify(specs, null, 2)
);

console.log("✅ OpenAPI documentation generated at docs/openapi.json");
