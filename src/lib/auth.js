// src/lib/auth.js
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "@/config/env";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const decoded = jwt.verify(sessionToken, env.JWT_SECRET);
    return { userId: decoded.userId, token: sessionToken };
  } catch (error) {
    return null;
  }
}

export async function createSession(userId) {
  const cookieStore = await cookies();
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
