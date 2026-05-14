import Lead from "../models/Lead.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalLeads, newLeads, inProgressLeads, convertedLeads, recentLeads, sourceBreakdown] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "New" }),
      Lead.countDocuments({ status: "In Progress" }),
      Lead.countDocuments({ status: "Converted" }),
      Lead.find().sort({ createdAt: -1 }).limit(6),
      Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
    ]);

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  res.json({
    success: true,
    data: {
      totalLeads,
      newLeads,
      inProgressLeads,
      convertedLeads,
      conversionRate,
      recentLeads,
      sourceBreakdown
    }
  });
});
