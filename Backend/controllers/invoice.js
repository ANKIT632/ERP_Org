const invoiceModel = require("../db/schema/invoiceSchema");

const createInvoice = async (req, res) => {
  try {
    let invoiceExist = await invoiceModel.find({
      invoiceNumber: req.body.invoiceNumber,
    });
    let val = req.body;

    if (invoiceExist[0] === "undefined") {
      return res.json({
        invoiceAlreadyExists: true,
      });
    }
    const invoice = await invoiceModel.create({ ...val });

    res.status(200).json({
      message: "invoice succss",
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(422).json({ errors: "invoice unsuccessfully" });
    }
    res.status(500).json({ error: err.message });
  }
};

// delete invoice
const deleteInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInvoice = await invoiceModel.findByIdAndDelete(id);
    if (!deleteInvoice) {
      return res.status(400).json({ message: "invoice not found" });
    }
    res.status(200).json({
      message: "invoice deleted successfully",
      invoice: deleteInvoice,
    });
  } catch (error) {
    res.status(400).json({ message: "try again", error: err.message });
  }
};

// const updateInvoiceById = async(req,res)=>{
//   try {
//     const {userId} = req.params;
//     const dataToUpdate = req.body;
//     const updateInovoice = await invoiceModel.findByIdAndUpdate(userId ,
//       {$set : dataToUpdate},
//       {new : true}
//       );
//       if(!updateInovoice){
//         return res.status(404).json({ message: "invoice not found" });
//       }
//       res
//     .status(200)
//     .json({ message: "invoice updated successfully", user: updateInovoice });
//   } catch (error) {
//     res.status(500).json({ error: err.message });
//   }
// }

const updateInvoiceById = async (req, res) => {
  try {
    const { userId } = req.params;
    const dataToUpdate = req.body;
    const updateInovoice = await invoiceModel.findByIdAndUpdate(
      userId,
      { $set: dataToUpdate },
      { new: true }
    );
    if (!updateInovoice) {
      return res.status(404).json({ message: "Inovoice not found" });
    }
    res
      .status(200)
      .json({ message: "Inovoice updated successfully", user: updateInovoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllInvoice = async (req, res) => {
  try {
    const results = await invoiceModel.find({
      _id: { $ne: req.params.id },
    });
    res.status(200).send(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
module.exports = {
  createInvoice,
  getAllInvoice,
  deleteInvoiceById,
  updateInvoiceById,
};
