const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Server API",
      version: "1.0.0",
      description: "This is a super simple server API documented with Swagger",
    },
    servers: [{ url: "/api" }, { url: "http://localhost:3000/api" }],
  },
  apis: [path.join(__dirname, "*.js")],
};

module.exports = swaggerJsdoc(options);
