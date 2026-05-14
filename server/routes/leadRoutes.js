import express from "express";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
  updateLeadStatus
} from "../controllers/leadController.js";

const router = express.Router();

router.route("/").get(getLeads).post(createLead);
router.route("/:id").get(getLeadById).put(updateLead).delete(deleteLead);
router.patch("/:id/status", updateLeadStatus);

export default router;
