import AuditModel from "../models/Audit.js";

export const create = async (req, res) => {
  try {
    await AuditModel({
      userId: req.userId,
      auditName: req.body.auditName,
      overallTechHealth: req.body.overallTechHealth,
      overallInformation: req.body.overallInformation,
      computerCovered: req.body.computerCovered,
      hostingCost: req.body.hostingCost,
      contractCost: req.body.contractCost,
      overallBackupLevel: req.body.overallBackupLevel,
      overallSecurityLevel: req.body.overallSecurityLevel,
      overallHardwareLevel: req.body.overallHardwareLevel,
    }).save();
    res.status(201).json({ isSuccess: true });
  } catch (error) {
    res.status(404).json("failed to post audit");
  }
};

export const many = async (req, res) => {
  try {

    const result = await AuditModel.find({ userId: req.userId });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
