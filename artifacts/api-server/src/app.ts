import express, { type Express, type ErrorRequestHandler } from "express";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
app.disable("x-powered-by");
// Only the immediate routing proxy is trusted; do not trust arbitrary chains.
app.set("trust proxy", 1);

const requestLogger = pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  });
app.use((req, res, next) => {
  // No chat content/query strings/error objects reach automatic app logs.
  if (req.path.startsWith("/api/portfolio")) { next(); return; }
  requestLogger(req, res, next);
});
app.use(express.json({ limit: "4kb" }));

app.use("/api", router);
const errors: ErrorRequestHandler = (_err, _req, res, _next) => {
  // Body-parser errors can contain the original body. Never serialize them.
  res.status(400).json({ error: "Request could not be processed." });
};
app.use(errors);

export default app;
