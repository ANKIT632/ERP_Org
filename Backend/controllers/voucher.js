// const nodemailer = require("nodemailer");
const { voucherModel } = require("../db/db");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createVoucher = async (req, res) => {
  console.log("hello function calling....");
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(422).json({ errors: "File upload unsuccessful" });
      }

      const val = req.body;
      console.log(val, "valueee");
      const result = await cloudinary.uploader.upload(req.file);
      console.log(result, "image link");

      const voucher = new voucherModel({
        voucherType: val.voucherType,
        voucherNumber: val.voucherNumber,
        VoucherNote: val.VoucherNote,
        selectLedger: val.selectLedger,
        credit: val.credit,
        debit: val.debit,
        currBalance: val.currBalance,
        file: result.secure_url,
      });

      await voucher.save();

      res.status(200).json({
        message: "Voucher registration success",
        file: result.secure_url,
      });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(422)
      .json({ errors: "Voucher registration unsuccessful" });
  }
};

// const createVoucher = async (req, res) => {
//   try {
//     // let voucherExists = await voucherModel.find({ voucherNumber: req.body.voucherNumber });
//     const val  = req.body;
//     console.log(val , "valueee")
//     const result = await cloudinary.uploader.upload(req.file.buffer);
//     console.log(result, "image link")
//     const voucher = new voucherModel({val ,file: result.secure_url });
//     await voucher.save();

//     res.status(200).json({
//       message: "voucherrrrrrrr success"
//     });
//     res.json({ file: result.secure_url });
//   } catch (err) {
//     console.error(err);
//     return res.status(422).json({ errors: "Voucher registration unsuccessful" });
//   }
// };

const getAllVoucher = async (req, res) => {
  try {
    const results = await voucherModel.find({
      _id: { $ne: req.params.id },
    });
    // console.log(results);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
const updateVoucherById = async (req, res) => {
  try {
    const { userId } = req.params;
    const dataToUpdate = req.body;
    const updatedVoucher = await voucherModel.findByIdAndUpdate(
      userId,
      { $set: dataToUpdate },
      { new: true }
    );
    if (!updatedVoucher) {
      return res.status(404).json({ message: "voucher not found" });
    }
    res
      .status(200)
      .json({ message: "Voucher updated successfully", user: updatedVoucher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteVoucherById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteVoucher = await voucherModel.findByIdAndDelete(userId);
    if (!deleteVoucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    res
      .status(200)
      .json({ message: "Voucher deleted successfully", user: deleteVoucher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createVoucher,
  getAllVoucher,
  updateVoucherById,
  deleteVoucherById,
};
