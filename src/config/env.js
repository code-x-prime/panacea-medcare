// src/config/env.js
const requiredEnvVars = [
  "DATABASE_URL",
  //   "OPENAI_API_KEY",
  "JWT_SECRET",
  "FROM_EMAIL",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASSWORD",
];

const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

// Warn if OPENAI_API_KEY is missing (optional for now)
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === "") {
  console.warn(
    "Warning: OPENAI_API_KEY is not set. Chatbot functionality will be disabled."
  );
}

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4o-mini",
  JWT_SECRET: process.env.JWT_SECRET,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "Panacea Medcare",
  FROM_EMAIL: process.env.FROM_EMAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

export default env;
