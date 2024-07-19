import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import User from "../models/user.model.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email });
        if (user) {
          const error = new Error("INVALID CREDENTIALS");
          error.status = 400;
          return done(error);
        }
        req.body.password = createHash(password)
        user = await User.create(req.body);
        user.password = null;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await User.findOne({ email });
        if (!one) {
          const error = new Error("INVALID CREDENTIALS");
          error.status = 400;
          return done(error);
        }
        const verifyPass = verifyHash(password, one.password);
        if (!verifyPass) {
          const error = new Error("INVALID CREDENTIALS");
          error.status = 400;
          return done(error);
        }
        one.password = null;
        const token = createToken({ email: one.email, role: one.role });
        req.token = token;
        return done(null, one);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
