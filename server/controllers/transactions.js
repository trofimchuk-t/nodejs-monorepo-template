const Transactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
];
let lastId = 3;

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    // const transactions = await Transaction.find();
    const transactions = Transactions;
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create a new transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  const { text, amount } = req.body;
  lastId++;
  try {
    // const transaction = await Transaction.create(req.body);
    const transaction = {
      id: lastId,
      text,
      amount,
    };
    Transactions.push(transaction);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(v => v.message);
        return res.status(400).json({
            success: false,
            error: messages
        });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    // const transaction = await Transaction.findById(req.params.id);
    const id = parseInt(req.params.id);
    const transaction = Transactions.find((transaction) => transaction.id === id);

    if (!transaction) {
        return res.status(404).json({
            success: false,
            error: 'No transaction found'
        });
    }

    Transactions.splice(
        Transactions.findIndex((transaction) => transaction.id === id),
        1
      );

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};