import { Router, type IRouter } from "express";
import { AskAmbassadorBody, AskAmbassadorResponse, GetPortfolioEvidenceResponse } from "@workspace/api-zod";
import { evidence } from "../lib/portfolio-evidence";
import { answerRecruiterQuestion } from "../lib/ambassador";
import { takeAmbassadorQuota } from "../lib/ambassador-quota";

const router: IRouter = Router();
router.use("/portfolio", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

router.get("/portfolio/evidence", (_req, res) => {
  res.json(GetPortfolioEvidenceResponse.parse(evidence));
});

router.post("/portfolio/ambassador", async (req, res): Promise<void> => {
  // Same-site browsers only; direct non-browser clients remain rate limited.
  const origin = req.get("origin");
  const forwardedHost = req.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (origin) {
    try {
      if (new URL(origin).host !== (forwardedHost || req.get("host"))) {
        res.status(403).json({ error: "Cross-origin requests are not permitted." }); return;
      }
    } catch {
      res.status(403).json({ error: "Invalid origin." }); return;
    }
  }
  const body = AskAmbassadorBody.safeParse(req.body);
  if (!body.success || !body.data.question.trim()
      || Object.keys(req.body).some(key => key !== "question")) {
    res.status(400).json({ error: "Send one question between 1 and 600 characters." }); return;
  }
  try {
    if (!await takeAmbassadorQuota(req.ip ?? req.socket.remoteAddress ?? "unknown")) {
      res.setHeader("Retry-After", "600");
      res.status(429).json({ error: "Question limit reached. Please try again in 10 minutes." }); return;
    }
    const answer = await answerRecruiterQuestion(body.data.question.trim());
    res.json(AskAmbassadorResponse.parse(answer));
  } catch {
    // Do not log error objects: provider errors can include request bodies.
    res.status(503).json({ error: "The ambassador is temporarily unavailable. Please retry or review the evidence below." });
  }
});

export default router;
