import AuditModel from "../models/Audit.js";

export const create = async (req, res) => {
  try {
    const result = await AuditModel({
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
    console.log(result);
    res.status(201).json({ isSuccess: true, id: result._id });
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

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await AuditModel.findOne({
      _id: postId,
    });
    console.log(result);
    if (!result) {
      res.status(404).json({
        message: "Cannot find audit",
      });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    AuditModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "failed remove this post",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Post not finded",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed finded this one post",
    });
  }
};