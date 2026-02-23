import "dotenv/config";
import { connectDb } from "./config/db.js";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 4000);
const mongoUri = process.env.MONGODB_URI;


if (!mongoUri) {
  console.error("Missing MONGODB_URI in server/.env");
  process.exit(1);
}

try {
  await connectDb(mongoUri);
} catch (err) {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
}

const app = createApp();
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});