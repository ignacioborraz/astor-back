import CustomRouter from "./CustomRouter.js";
import authRouter from "./api/auth.api.js";
import samplesRouter from "./api/sample.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/auth", authRouter);
    this.use("/samples", samplesRouter);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
