import mongoose from "mongoose";

const AuditScheme = new mongoose.Schema(
  {
    techHealth: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Audit", AuditScheme);
