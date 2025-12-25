import jwt from "jsonwebtoken";

// 2400h = 100 days
export function generateToken(payload, secret, expiresIn = "3d") {
  return jwt.sign(payload, secret, { expiresIn });
}

export function generate2FAToken(payload, secret, expiresIn = "15d") {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
