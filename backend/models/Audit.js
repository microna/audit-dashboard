import mongoose from "mongoose";

const AuditScheme = new mongoose.Schema(
  {
    auditName: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Audit", AuditScheme);
