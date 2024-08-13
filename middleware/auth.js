import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token!" });
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token!" });
    }
    try {
      const admin = await Admin.findOne({ _id: decode.id, token });
      if (admin === null) {
        return res.status(401).send({ message: "Invalid token!" });
      }
      req.admin = admin;
      next();
    } catch (err) {
      next(err);
    }
  });
}

export default auth;
