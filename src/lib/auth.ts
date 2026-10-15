import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI;

if (
  !mongoUri ||
  (!mongoUri.startsWith("mongodb://") &&
    !mongoUri.startsWith("mongodb+srv://"))
) {
  throw new Error(
    "Invalid MONGODB_URI. Check your environment variables."
  );
}

const client = new MongoClient(mongoUri);
const db = client.db("bazardor");

export const auth = betterAuth({
  appName: "Bazar Dor",

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  database: mongodbAdapter(db, { client }),

  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://bazar-doe-2.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});