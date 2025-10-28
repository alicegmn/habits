const fs = require("fs");
const path = require("path");
const specs = require("./swagger.jsdoc.js");

// Paths
const docsDir = path.join(__dirname, "docs");
const htmlTemplatePath = path.join(__dirname, "swagger-viewer.html");

// 1️⃣ Create docs/ folder if missing
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// 2️⃣ Write OpenAPI JSON
const openapiPath = path.join(docsDir, "openapi.json");
fs.writeFileSync(openapiPath, JSON.stringify(specs, null, 2));
console.log("✅ OpenAPI JSON generated at docs/openapi.json");

// 3️⃣ Copy or create index.html viewer
const htmlTargetPath = path.join(docsDir, "index.html");

let htmlTemplate = "";
if (fs.existsSync(htmlTemplatePath)) {
  htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");
} else {
  // fallback default viewer if template missing
  htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Server API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
    <style>body{margin:0;background:#fafafa;}</style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = () => {
        SwaggerUIBundle({
          url: "openapi.json",
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: "BaseLayout",
        });
      };
    </script>
  </body>
</html>`;
}

fs.writeFileSync(htmlTargetPath, htmlTemplate);
console.log("✅ Swagger UI HTML viewer created at docs/index.html");

// 4️⃣ Warn if no endpoints were found
if (!specs.paths || Object.keys(specs.paths).length === 0) {
  console.warn("⚠️  Warning: No endpoints found in Swagger spec (paths is empty).");
  console.warn("💡  Check your '@openapi' comments and 'apis' path in swagger.jsdoc.js.\n");
}

if (!specs.components || Object.keys(specs.components).length === 0) {
  console.warn("⚠️  Warning: No components (schemas) found in Swagger spec.\n");
}
