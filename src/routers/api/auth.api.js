//ENRUTADOR LLAMA A CONTROLADOR
import CustomRouter from "../CustomRouter.js";
import passportCallback from "../../middlewares/passportCb.mid.js";

class AuthRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCallback("register"),
      async (req, res, next) => {
        try {
          return res.message201("USER REGISTERED!");
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create(
      "/login",
      ["PUBLIC"],
      passportCallback("login"),
      async (req, res, next) => {
        try {
          return res.cookie("token", req.token).message200("USER LOGGED IN!");
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
