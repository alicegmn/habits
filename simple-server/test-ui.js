// test-ui.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");

const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(4000, () => console.log("🧪 Test UI on http://localhost:4000/docs"));
