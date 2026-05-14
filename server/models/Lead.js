import mongoose from "mongoose";

export const LEAD_SOURCES = ["Website", "Referral", "Social Media", "Ads", "Other"];
export const LEAD_STATUSES = ["New", "In Progress", "Converted"];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
      maxlength: [120, "Lead name must be 120 characters or fewer"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      maxlength: [40, "Phone must be 40 characters or fewer"]
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [140, "Company must be 140 characters or fewer"]
    },
    source: {
      type: String,
      enum: LEAD_SOURCES,
      default: "Website"
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New"
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, "Notes must be 2000 characters or fewer"],
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

leadSchema.index({ name: "text", email: "text", company: "text" });
leadSchema.index({ status: 1, source: 1, createdAt: -1 });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
