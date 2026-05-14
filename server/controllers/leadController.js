import Lead, { LEAD_SOURCES, LEAD_STATUSES } from "../models/Lead.js";
import asyncHandler from "../middleware/asyncHandler.js";

const normalizeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getLeads = asyncHandler(async (req, res) => {
  const { search = "", status = "All", source = "All", sort = "newest" } = req.query;
  const query = {};

  if (search.trim()) {
    const safeSearch = normalizeRegex(search.trim());
    query.$or = [
      { name: { $regex: safeSearch, $options: "i" } },
      { email: { $regex: safeSearch, $options: "i" } },
      { company: { $regex: safeSearch, $options: "i" } }
    ];
  }

  if (status !== "All" && LEAD_STATUSES.includes(status)) {
    query.status = status;
  }

  if (source !== "All" && LEAD_SOURCES.includes(source)) {
    query.source = source;
  }

  const sortDirection = sort === "oldest" ? 1 : -1;
  const leads = await Lead.find(query).sort({ createdAt: sortDirection });

  res.json({
    success: true,
    count: leads.length,
    data: leads
  });
});

export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.json({ success: true, data: lead });
});

export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);

  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    data: lead
  });
});

export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.json({
    success: true,
    message: "Lead updated successfully",
    data: lead
  });
});

export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!LEAD_STATUSES.includes(status)) {
    res.status(400);
    throw new Error("Invalid lead status");
  }

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.json({
    success: true,
    message: "Lead status updated successfully",
    data: lead
  });
});

export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.json({
    success: true,
    message: "Lead deleted successfully",
    data: lead
  });
});
