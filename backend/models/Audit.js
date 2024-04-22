import mongoose from "mongoose";

const AuditScheme = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    auditName: {
      type: String,
      required: true,
    },
    overallTechHealth: {
      type: Number,
      required: true,
    },
    overallInformation: {
      type: String,
      required: true,
    },
    computerCovered: {
      type: Number,
      required: true,
    },
    hostingCost: {
      type: Number,
      required: true,
    },
    contractCost: {
      type: Number,
      required: true,
    },
    overallBackupLevel: {
      type: Number,
      required: true,
    },
    overallSecurityLevel: {
      type: Number,
      required: true,
    },
    overallHardwareLevel: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Audit", AuditScheme);
