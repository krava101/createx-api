import Admin from "../models/admin.js";
import {
  adminLoginSchema,
  adminRegisterSchema,
} from "../schemas/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res, next) {
  const isValid = adminRegisterSchema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  const { username, email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin !== null) {
      return res.status(409).send({ message: "User is already registered" });
    }
    const hashedPas = await bcrypt.hash(password, 10);
    await Admin.create({ username, email, password: hashedPas });

    return res
      .status(201)
      .send({ message: `${username} has successfully registered` });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  const isValid = adminLoginSchema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin === null) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect!" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect!" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    await Admin.findByIdAndUpdate(admin._id, { token });

    return res
      .status(200)
      .send({ token: token, username: admin.username, email: admin.email });
  } catch (e) {
    next(e);
  }
}

export default { register, login };
