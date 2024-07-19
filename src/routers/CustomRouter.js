import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import User from "../models/user.model.js";

class CustomRouter {
  //para construir y configurar cada instancia del enrutador
  constructor(model) {
    this.router = Router();
    this.init();
  }
  //para obtener todas las rutas del enrutador definido
  getRouter() {
    return this.router;
  }
  //para inicializar las clases/propiedades heredades (sub-routers)
  init() {}
  //para manejar las callbacks (de middlewares y la final)
  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }
  response = (req, res, next) => {
    res.paginate = (response) => {
      const { docs, ...info } = response;
      res.status(200).json({ success: true, response: docs, info });
    };
    res.response200 = (response) => res.status(200).json({ success: true, response });
    res.message200 = (message) => res.status(200).json({ success: true, message });
    res.message201 = (message) => res.status(201).json({ success: true, message });
    res.error400 = (message) => res.status(400).json({ success: true, message });
    res.error401 = () => res.status(401).json({ success: false, message: "BAD AUTH" });
    res.error403 = () => res.status(403).json({ success: false, message: "FORBIDDEN" });
    res.error404 = () => res.status(404).json({ success: false, message: "NOT FOUND DOCS" });
    res.fatal = (message) => res.status(500).json({ success: false, message });
    return next();
  };
  policies = (policies) => async (req, res, next) => {
    try {
      if (policies.includes("PUBLIC")) return next();
      const token = req.cookies["token"];
      if (!token) return res.error401();
      const dataOfToken = verifyToken(token);
      const { email, role } = dataOfToken;
      if (
        (policies.includes("USER") && role === "USER") ||
        (policies.includes("ADMIN") && role === "ADMIN")
      ) {
        const user = await User.findOne({ email });
        user.password = null;
        req.user = user;
        return next();
      }
      return res.error403();
    } catch (error) {
      return next(error);
    }
  };
  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  read(path, arrayOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.patch(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }
}

export default CustomRouter;
