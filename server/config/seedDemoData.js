import Lead from "../models/Lead.js";
import demoLeads from "./demoLeads.js";

export const seedDemoData = async ({ force = false } = {}) => {
  const existingLeads = await Lead.countDocuments();

  if (existingLeads > 0 && !force) {
    return { inserted: 0, skipped: true };
  }

  if (force) {
    await Lead.deleteMany({});
  }

  const inserted = await Lead.insertMany(demoLeads);
  return { inserted: inserted.length, skipped: false };
};
