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
    "Invalid MONGODB_URI. Check your .env.local file."
  );
}

const client = new MongoClient(mongoUri);
const db = client.db("bazardor");

export const auth = betterAuth({
  appName: "Bazar Dor",

  database: mongodbAdapter(db, { client }),

  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://bazar-doe-2-5zj5dzkxh-91fazlulkarim91-dotcom.vercel.app",
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