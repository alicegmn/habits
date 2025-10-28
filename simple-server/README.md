# 💩 Simple Server API

A super simple **Express.js** API documented with **Swagger-JSDoc** and **Redoc**.

This project demonstrates how to write JSDoc comments directly in your server code and automatically generate OpenAPI documentation.

---

## 🚀 Getting Started

```bash
npm install
npm start
```

The API will be running at:

- **API:** [http://localhost:3000/api/users](http://localhost:3000/api/users)
- **Swagger UI (interactive docs):** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Static docs (HTML or JSON):** [http://localhost:3000/api/static-docs/index.html](http://localhost:3000/api/static-docs/index.html)

---

## 📜 Available Commands

| Command             | Description                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm start`         | Starts the Express server and serves Swagger UI.                                                                                                                                                                   |
| `npm run docs`      | Generates the OpenAPI JSON file (`docs/openapi.json`) by parsing JSDoc comments with **swagger-jsdoc**.<br>⚠️ If your documentation is empty, the script will warn you that no endpoints or components were found. |
| `npm run docs:html` | Uses **Redoc** to bundle the generated OpenAPI spec into a standalone HTML documentation page (`docs/index.html`).                                                                                                 |
| `npm test`          | Placeholder test script (no tests yet).                                                                                                                                                                            |

---

## 🧬 How It Works

1. **swagger-jsdoc** scans your code (e.g., `server.js`) for comments like:

   ```js
   /**
    * @openapi
    * /api/users:
    *   get:
    *     summary: Get all users
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: Returns a list of users
    */
   ```

2. It converts those into a valid **OpenAPI (3.0)** specification.

3. `generate-docs.js` writes that specification to `docs/openapi.json`.

4. **swagger-ui-express** uses that JSON to render an interactive documentation view.

5. **redoc-cli** can convert the same JSON into a static, pretty HTML file.

---

## 📦 Project Structure

```
simple-server/
├── server.js              # Express app + JSDoc API comments
├── swagger.jsdoc.js       # Swagger-JSDoc configuration
├── generate-docs.js       # Generates docs/openapi.json
├── docs/                  # Generated OpenAPI files (JSON + HTML)
├── package.json           # Scripts and dependencies
└── README.md              # You are here ✨
```

---

## 🧩 Example Endpoints

| Method | Path         | Description                     |
| ------ | ------------ | ------------------------------- |
| `GET`  | `/api/users` | Returns a list of example users |
| `POST` | `/api/users` | Creates a new user              |

---

## ✨ Notes

- The server automatically warns you if no endpoints are detected in your Swagger spec.
- You can open the JSON file manually in `docs/openapi.json` to verify that JSDoc parsing worked.

---

## Skillnad mellan builder/test-stage och runtime-stage

- **Builder/test-stage**: Bygger och testar applikationen. Inkluderar alla utvecklingsberoenden.
- **Runtime-stage**: Skapar en mindre, renare image för produktion. Inkluderar endast produktionsberoenden.

---

## Varför separera dessa steg?

- Minskar storleken på produktionsimagen.
- Gör det möjligt att köra tester utan att påverka produktionsmiljön.
- Förbättrar säkerheten genom att exkludera utvecklingsverktyg från produktion.

---

## Fördelar med att skicka en mindre, renare image till Docker Hub

- Snabbare nedladdning och distribution.
- Mindre attackyta för säkerhetsproblem.
- Lägre lagringskostnader.

---

## Reflektion

- **Större projekt**: Detta tillvägagångssätt gör det enklare att samarbeta, eftersom alla utvecklare kan använda samma Dockerfile för både test och produktion.
- **En Dockerfile för alla miljöer**: Minskar underhållsarbete och risken för inkonsistens mellan olika miljöer.

---

## Slutsats

En multistage pipeline och struktur gör projektet mer robust, skalbart och lättare att underhålla.
