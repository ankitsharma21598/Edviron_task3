// Import the Mongoose client configuration
const client = require("../../../config/mongoose");

// Define the "disbursing" function that will handle the request and response
module.exports.disbursing = async function (req, res) {
  // Access the "test" database from the Mongoose client
  const db = client.db("test");

  // Access the "transactions" collection in the database
  const transactionCollection = db.collection("transactions");

  // Initialize an empty object to store payments for each school
  let paymentForSchools = {};

  // Find all transactions with a status of "SUCCESS" or "Success"
  const successTransactions = await transactionCollection
    .find({ status: { $in: ["SUCCESS", "Success"] } })
    .toArray();

  // Iterate through each successful transaction
  for (const trans of successTransactions) {
    let paymentStatus = "UNKNOWN";

    // Determine payment status based on the payment mode
    if (trans.payment_mode === "ONLINE" || trans.payment_mode === "CASH") {
      paymentStatus = "CLEARED";
    }

    if (trans.payment_mode === "CHEQUE") {
      // Retrieve the corresponding Cheque from the "cheques" collection
      const cheque = await db
        .collection("cheques")
        .findOne({ _id: trans.cheque });

      // If the Cheque exists and is cleared, set the payment status to "CLEARED"
      if (cheque && cheque.status === "CLEARED") {
        paymentStatus = "CLEARED";
      }
    } else if (trans.payment_mode === "DEMAND_DRAFT") {
      // Retrieve the corresponding Demand Draft (DD) from the "demanddrafts" collection
      const DD = await db.collection("demanddrafts").findOne({ _id: trans.dd });

      // If the DD exists and is cleared, set the payment status to "CLEARED"
      if (DD && DD.status === "CLEARED") {
        paymentStatus = "CLEARED";
      }
    }

    // If the payment is cleared, update the payment amount for the school
    if (paymentStatus === "CLEARED") {
      if (paymentForSchools.hasOwnProperty(trans.school)) {
        paymentForSchools[trans.school] += trans.amount || 0;
      } else {
        paymentForSchools[trans.school] = trans.amount || 0;
      }
    }
  }

  // Send a JSON response with the payment amounts for each school
  res.status(200).json({
    message: "Payment to each school based on schoolId",
    paymentForSchools,
  });
};
