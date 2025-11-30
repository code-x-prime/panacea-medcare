// prisma.config.js
import { config } from "dotenv";

config();

const prismaConfig = {
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

export default prismaConfig;








