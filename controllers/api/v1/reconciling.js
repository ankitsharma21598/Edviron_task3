// Import the Mongoose client configuration
const client = require("../../../config/mongoose");

// Initialize an empty array to store reconciled transactions
let reconciledTransaction = [];

// Define the "reconciling" function that will handle the request and response
module.exports.reconciling = async function (req, res) {
  // Access the "test" database from the Mongoose client
  const db = client.db("test");

  // Access the "transactions" collection in the database
  const transactionCollection = db.collection("transactions");

  // Reconcile Cheque Transactions
  const chequesTransaction = await transactionCollection
    .find({ payment_mode: "CHEQUE" })
    .toArray();

  // Iterate through each Cheque Transaction
  chequesTransaction.map(async (chequeTransaction) => {
    // Retrieve the corresponding Cheque from the "cheques" collection
    const cheque = await db
      .collection("cheques")
      .find({ _id: chequeTransaction.cheque })
      .toArray();

    // Check if the Cheque exists and has certain conditions
    if (cheque && cheque.length > 0) {
      if (
        (cheque[0].status == "BOUNCED" &&
          chequeTransaction.status != "FAILED") ||
        (cheque[0].status == "CLEARED" &&
          chequeTransaction.status != "SUCCESS") ||
        (cheque[0].status == "PENDING" && chequeTransaction.status != "PENDING")
      ) {
        // Create a transaction object and add it to the reconciledTransaction array
        const trans = {
          transaction_id: chequeTransaction._id,
          transaction_status: chequeTransaction.status,
          cheque_status: cheque[0].status,
        };

        reconciledTransaction.push(trans);
      }
    } else {
      // If the Cheque does not exist, add a transaction with an error message
      const trans = {
        transaction_id: chequeTransaction._id,
        transaction_status: chequeTransaction.status,
        cheque_status: "Cheque status not found",
      };

      reconciledTransaction.push(trans);
    }
  });

  // Reconcile Demand Draft (DD) Transactions
  const DDTransaction = await transactionCollection
    .find({ payment_mode: "DEMAND_DRAFT" })
    .toArray();

  // Iterate through each DD Transaction
  DDTransaction.map(async (DDTransaction) => {
    // Retrieve the corresponding Demand Draft (DD) from the "demanddrafts" collection
    const DD = await db
      .collection("demanddrafts")
      .find({ _id: DDTransaction.dd })
      .toArray();

    // Check if the DD exists and has certain conditions
    if (DD && DD.length > 0) {
      if (
        (DD[0].status == "BOUNCED" && DDTransaction.status != "FAILED") ||
        (DD[0].status == "CLEARED" && DDTransaction.status != "SUCCESS") ||
        (DD[0].status == "PENDING" && DDTransaction.status != "PENDING")
      ) {
        // Create a transaction object and add it to the reconciledTransaction array
        const trans = {
          transaction_id: DDTransaction._id,
          transaction_status: DDTransaction.status,
          DD_status: DD[0].status,
        };

        reconciledTransaction.push(trans);
      }
    } else {
      // If the DD does not exist, add a transaction with an error message
      const trans = {
        transaction_id: DDTransaction._id,
        transaction_status: DDTransaction.status,
        DD_status: "Demand Draft Status not found",
      };

      reconciledTransaction.push(trans);
    }
  });

  // Send a JSON response with the reconciled transactions and a success message
  res.status(200).json({
    message: "Here are the reconciling transactions through Cheque and Demand Draft",
    reconciledTransaction,
  });
};
