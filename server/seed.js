import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { seedDemoData } from "./config/seedDemoData.js";

dotenv.config();

const runSeed = async () => {
  try {
    await connectDB();
    const result = await seedDemoData({ force: process.argv.includes("--force") });
    console.log(
      result.skipped
        ? "Seed skipped because leads already exist."
        : `Seeded ${result.inserted} demo leads.`
    );
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

runSeed();
