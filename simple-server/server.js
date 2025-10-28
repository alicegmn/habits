const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger.jsdoc.js");

const app = express();
const port = 3000;

app.use(express.json());

/**
 * ✅ Debug helper: Warn if Swagger spec is missing endpoints
 */
if (!specs.paths || Object.keys(specs.paths).length === 0) {
  console.warn(
    "⚠️  Warning: No endpoints found in Swagger spec (paths is empty)."
  );
  console.warn(
    "💡  Check that your JSDoc comments use '@openapi' and that 'apis' path is correct in swagger.jsdoc.js.\n"
  );
}

if (!specs.components || Object.keys(specs.components).length === 0) {
  console.warn("⚠️  Warning: No components (schemas) found in Swagger spec.\n");
}

// 🧾 Optional: Log full spec for inspection
console.log("🧾 Swagger spec preview:\n");
console.log(JSON.stringify(specs, null, 2));

// Swagger UI route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Serve static Redoc/JSON docs
app.use("/api/static-docs", express.static("docs"));

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;
  const newUser = { id: Date.now(), name };
  res.status(201).json(newUser);
});

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Alice
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Charlie
 */

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`📘 Swagger UI:     http://localhost:${port}/api/docs`);
  console.log(
    `📄 Static docs:    http://localhost:${port}/api/static-docs/index.html`
  );
});
