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
    overallHardwareLevel: {
      type: Number,
      required: true,
    },
    overallHardwareLevel: {
      type: Number,
      required: true,
    },
    overallHardwareLevel: {
      type: Number,
      required: true,
    },
    onlinePremiseServersStatus: {
      type: String,
      required: true,
    },
    onlineFileStorageStatus: {
      type: String,
      required: true,
    },
    onlineDedicatedServersStatus: {
      type: String,
      required: true,
    },
    emailOnlinePersonalStatus: {
      type: String,
      required: true,
    },
    personalComputerStatus: {
      type: String,
      required: true,
    },
    fileTestRecovery: {
      type: Date,
      required: true,
    },
    backupSuccessRate: {
      type: Number,
      required: true,
    },
    drStatus: {
      type: String,
      required: true,
    },
    hardwareSystemSupport: {
      type: Number,
      required: true,
    },
    hardwareSystemOverdue: {
      type: Number,
      required: true,
    },
    digitalMaturitIndex: {
      type: Number,
      required: true,
    },
    hardwareAssetsSupported: {
      type: Number,
      required: true,
    },
    hardwareAssetsUnsupportedSoon: {
      type: Number,
      required: true,
    },
    hardwareAssetsUnsupported: {
      type: Number,
      required: true,
    },
    hardwareAssetsUnknown: {
      type: Number,
      required: true,
    },
    officeSuiteSupported: {
      type: Number,
      required: true,
    },
    officeSuiteUnsupportedSoon: {
      type: Number,
      required: true,
    },
    officeSuiteUnsupported: {
      type: Number,
      required: true,
    },
    officeSuiteAssetsUnknown: {
      type: Number,
      required: true,
    },
    officeSuiteAssetsUnknown: {
      type: Number,
      required: true,
    },
    multiFactorAuthentication: {
      type: String,
      required: true,
    },
    securityTrainingGiven: {
      type: String,
      required: true,
    },
    accountsAudited: {
      type: String,
      required: true,
    },
    vulnerabilityManagement: {
      type: String,
      required: true,
    },
    mobileDeviceManagement: {
      type: String,
      required: true,
    },
    allComputersUpToDate: {
      type: String,
      required: true,
    },
    allComputersRunningAntiVirus: {
      type: String,
      required: true,
    },
    advanceEmailProtectionWithAdvancedMalware: {
      type: String,
      required: true,
    },
    businessFilesProtected: {
      type: String,
      required: true,
    },
    aiImplemented: {
      type: String,
      required: true,
    },
    globalAdminsNames: {
      type: String,
      required: true,
    },
    globalAdminsNamesStatus: {
      type: String,
      required: true,
    },
    desktopAdminNames: {
      type: String,
      required: true,
    },
    desktopAdminNamesStatus: {
      type: String,
      required: true,
    },
    serverAdminNames: {
      type: String,
      required: true,
    },
    serverAdminNamesStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Audit", AuditScheme);
